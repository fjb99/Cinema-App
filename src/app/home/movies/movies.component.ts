import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { IMovie } from 'src/app/core/models/movie';
import { CategoryService } from 'src/app/core/services/category.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MoviesCreateUpdateComponent } from './movies-create-update/movies-create-update.component';

@Component({
  selector: 'ikub-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy{

  private onComponentDestroy$: Subject<void> = new Subject<void>();
  public movies!: Array<IMovie>;
  public allMovies!: Array<IMovie>;
  // public movie$!: Observable<Array<IMovie>>;
  public categories$!: Observable<Array<ICategory>>;
  public form!: FormGroup;

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadMovies();
    this.loadCategoryList();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      movieName: new FormControl(),
      category: new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  public loadMovies(): void {
    this.movieService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe(
      (response: Array<IMovie>) => {
        this.movies = response;
        this.allMovies = response;
      },
      () => this.matSnackBar.open('Error loading Movie List!', 'Dismiss', { duration: 0, panelClass: [ 'warn-background', 'white-color' ] })
    // this.movie$ = this.movieService.getList();
    );
  }

  public search(): void {
    const movieName: string | null | undefined = this.form.get('movieName')?.value;
    const category: ICategory = this.form.get('category')?.value;
    this.movies = this.allMovies.filter((movie: IMovie) => {
      let movieNameMatch = true;
      if (movieName?.trim().length) {
        movieNameMatch = !!movie.name?.trim().toLowerCase()?.includes(movieName.trim().toLowerCase());
      }
      let categotyMatches = true;
      if (category) {
        categotyMatches = movie.category?.name === category.name;
      }
      return movieNameMatch && categotyMatches;
    });
  }

  public loadCategoryList(): void {
    this.categories$ = this.categoryService.getList();
  }

  public createMovie(): void {
    const dialogRef: MatDialogRef<MoviesCreateUpdateComponent> = this.dialog.open(MoviesCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: IMovie) => {
      this.movieService.create(formValue).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: IMovie) => {
          dialogRef.close();
          this.movies.push(response);
          this.matSnackBar.open(`Movie "${response.name}" has been created successfully!`, '',  { panelClass: [ 'success-background', 'white-color' ] });
        },
        (error) => {
          this.matSnackBar.open(`There was an error creating category "${formValue.name}"!`);
        }
      );
    };
  }

  public updateMovie(movie: IMovie, index: number): void {
    const dialogRef: MatDialogRef<MoviesCreateUpdateComponent> = this.dialog.open(MoviesCreateUpdateComponent, {data: movie});
    dialogRef.componentInstance.onSaveFn = (formValue: IMovie) => {
      this.movieService.update({...movie, ...formValue}).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: IMovie) => {
          this.movies[index] = response;
          dialogRef.close();
          this.matSnackBar.open(`Movie "${movie.name}" has been updated successfully!`, '', { panelClass: [ 'success-background', 'white-color' ] });
        },
        (error) => {
          this.matSnackBar.open(`There was an error updating Movie "${movie.name}"`, '', { panelClass: [ 'success-background', 'white-color' ] });
        }
      );
    };
  }

  public deleteMovie(movie: IMovie): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {data: `Are you sure you want to delete movie "${movie.name}"?`, role: 'alertdialog'});
    dialogRef.componentInstance.onConfirmFn = () => {
      if (movie.id) {
        this.movieService.delete(movie.id).pipe(
          take(1),
          takeUntil(this.onComponentDestroy$)
        ).subscribe(
          () => {
            dialogRef.close();
            this.movies = this.movies.filter(currentmovie => currentmovie.id !== movie.id);
            this.matSnackBar.open(`Movie "${movie.name}" has been deleted successfully!`);
          }
        );
      } else {
        dialogRef.close();
      }
    };
  }

}
