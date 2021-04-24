import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
import { IMovie } from 'src/app/core/models/movie';
import { CategoryService } from 'src/app/core/services/category.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { MoviesCreateUpdateComponent } from './movies-create-update/movies-create-update.component';

@Component({
  selector: 'ikub-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies$!: Observable<Array<IMovie>>;
  public categories$: Observable<Array<ICategory>> | undefined;
  public form!: FormGroup;
  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMovies();
    this.loadCategoryList();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      filter: new FormControl(null),
      category: new FormControl(null)
    });
  }

  public loadMovies(): void {
    this.movies$ = this.movieService.getList();
  }

  public loadCategoryList(): void {
    this.categories$ = this.categoryService.getList();
  }

  public add(): void {
    this.dialog.open(MoviesCreateUpdateComponent);
  }

}
