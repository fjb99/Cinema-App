import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'ikub-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private onComponentDestroy$: Subject<void> = new Subject<void>();
  // public categories!: Array<ICategory>;
  public categories$!: Observable<Array<ICategory>>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  public loadCategories(): void {
    // this.categoryService.getList().pipe(takeUntil(this.onComponentDestroy$)).subscribe((response: Array<ICategory>) => this.categories = response);
    this.categories$ = this.categoryService.getList();
  }
}
