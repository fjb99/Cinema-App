import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
import { IMovie } from 'src/app/core/models/movie';
import { CategoryService } from 'src/app/core/services/category.service';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'ikub-movies-create-update',
  templateUrl: './movies-create-update.component.html',
  styleUrls: ['./movies-create-update.component.scss']
})
export class MoviesCreateUpdateComponent implements OnInit {

  form!: FormGroup;
  categories$!: Observable<Array<ICategory>>;

  onSaveFn!: (formValue: IMovie) => void;

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public selectedMovie: IMovie | undefined | null
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadCategoryList();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.selectedMovie?.name ?? null, Validators.required),
      category: new FormControl(this.selectedMovie?.category ?? null, Validators.required),
      rating: new FormControl(this.selectedMovie?.rating ?? null, Validators.required),
      year: new FormControl(this.selectedMovie?.year ?? null, Validators.required),
      imageUrl: new FormControl(this.selectedMovie?.imageUrl ?? null, Validators.required),
      description: new FormControl(this.selectedMovie?.description ?? null, Validators.required)
    });
  }

  private loadCategoryList(): void {
    this.categories$ = this.categoryService.getList();
  }

  public compareWithIdForDropdownFn = (a: ICategory, b: ICategory): boolean => a?.id === b?.id;
}
