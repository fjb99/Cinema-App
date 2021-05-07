import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { IMovie } from 'src/app/core/models/movie';
import { CategoryService } from 'src/app/core/services/category.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CategoriesCreateUpdateComponent } from './categories-create-update/categories-create-update.component';

@Component({
  selector: 'ikub-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private onComponentDestroy$: Subject<void> = new Subject<void>();
  public categories!: Array<ICategory>;
  public movies!: Array<IMovie>;
  // public categories$!: Observable<Array<ICategory>>;

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  private proceedToDeleteCategory(category: ICategory): void {
    if (this.movies?.find((movie: IMovie) => movie.category?.id === category.id)) {
      this.matSnackBar.open(`This category is already used in movies list!`, 'Dismiss', { duration: 0, panelClass: ['warn-background', 'white-color'] });
    } else {
      const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, { data: `Are you sure you want to delete category "${category.name}?"`, role: 'alertdialog' });
      // dialogRef.componentInstance.onCancelFn = () => {
      //   this.matSnackBar.open('You cancelled');
      // };
      dialogRef.componentInstance.onConfirmFn = () => {
        if (category.id) {
          this.categoryService.delete(category.id).pipe(
            take(1),
            takeUntil(this.onComponentDestroy$)
          ).subscribe(
            () => {
              dialogRef.close();
              this.categories = this.categories.filter(currentCategory => currentCategory.id !== category.id);
              this.matSnackBar.open(`Category "${category.name}" has been deleted successfully!`);
            },
            () => this.matSnackBar.open(`There was an error deleting category "${category.name}!`, '', { duration: 0, panelClass: ['warn-background', 'white-color'] })
          );
        } else {
          dialogRef.close();
        }
      };
    }
  }

  public loadCategories(): void {
    this.categoryService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe(
      (response: Array<ICategory>) => this.categories = response,
      (error) => this.matSnackBar.open('Error loading Category list!', 'Dismiss', { duration: 0, panelClass: [ 'warn-background', 'white-color' ] })
    );
    // this.categories$ = this.categoryService.getList();
  }

  public createCategory(): void {
    const dialogRef: MatDialogRef<CategoriesCreateUpdateComponent> = this.dialog.open(CategoriesCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: ICategory) => {
      if (this.categories?.find((category: ICategory) => category.name?.trim()?.toLowerCase() === formValue.name?.trim()?.toLowerCase())) {
        this.matSnackBar.open(`Category with name "${formValue.name}" already exists!`);
      } else {
        this.categoryService.create(formValue).pipe(
          take(1),
          takeUntil(this.onComponentDestroy$)
        ).subscribe(
          (response: ICategory) => {
            dialogRef.close();
            this.categories.push(response);
            this.matSnackBar.open(`Category "${response.name}" created successfully!`, '', { panelClass: [ 'success-background', 'white-color' ] });
          },
          () => this.matSnackBar.open(`There was an error creating category "${formValue.name}"!`, '', {panelClass: ['warn-background', 'white-color'] })
        );
      }
    };
  }

  public updateCategory(category: ICategory, index: number): void {
    const dialogRef: MatDialogRef<CategoriesCreateUpdateComponent> = this.dialog.open(CategoriesCreateUpdateComponent, { data: category });
    dialogRef.componentInstance.onSaveFn = (formValue: ICategory) => { // Rishikojme
      if (this.categories?.find((categoryFromList: ICategory) => categoryFromList.name?.trim()?.toLowerCase() === formValue.name?.trim()?.toLowerCase())) {
        this.matSnackBar.open(`Category with name "${formValue.name}" already exists!`);
      } else {
        this.categoryService.update({ ...category, ...formValue }).pipe(
          take(1),
          takeUntil(this.onComponentDestroy$)
        ).subscribe(
          (response: ICategory) => {
            dialogRef.close();
            this.categories[index] = response;
            this.matSnackBar.open(`Category "${category.name}" updated successfully to "${response.name}"!`, '', { panelClass: [ 'success-background', 'white-color' ] });
          },
          () => this.matSnackBar.open(`There was an error updating category "${category.name}" to "${formValue.name}"!`)
        );
      }
    };
  }

  public deleteCategory(category: ICategory): void {
    if (!this.movies) { // Load movies list for first time, required for special-case check
      this.movieService.getList().pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe((response: Array<IMovie>) => {
        this.movies = response;
        this.proceedToDeleteCategory(category);
      });
    } else {
      this.proceedToDeleteCategory(category);
    }
  }
}
