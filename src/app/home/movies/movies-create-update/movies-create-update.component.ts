import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
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

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCategoryList();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  private loadCategoryList(): void {
    this.categories$ = this.categoryService.getList();
  }

  public save(): void {
    console.log(this.form.value);
  }
}
