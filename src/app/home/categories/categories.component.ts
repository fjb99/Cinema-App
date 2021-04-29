import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoriesCreateUpdateComponent } from './categories-create-update/categories-create-update.component';

@Component({
  selector: 'ikub-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private onComponentDestroy$: Subject<void> = new Subject<void>();
  public categories!: Array<ICategory>;
  // public categories$!: Observable<Array<ICategory>>;

  constructor(
    private categoryService: CategoryService,
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

  public loadCategories(): void {
    this.categoryService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe((response: Array<ICategory>) => this.categories = response);
    // this.categories$ = this.categoryService.getList();
  }

  public createCategory(): void {
    const dialogRef: MatDialogRef<CategoriesCreateUpdateComponent> = this.dialog.open(CategoriesCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: { name: string }) => {
      this.categoryService.create(formValue).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ICategory) => {
          dialogRef.close();
          this.categories.push(response);
          this.matSnackBar.open(`Category "${response.name}" created successfully!`);
        },
        () => this.matSnackBar.open(`There was an error creating category "${formValue.name}"!`)
      );
    };
  }

  public updateCategory(category: ICategory, index: number): void {
    const dialogRef: MatDialogRef<CategoriesCreateUpdateComponent> = this.dialog.open(CategoriesCreateUpdateComponent, { data: category });
    dialogRef.componentInstance.onSaveFn = (formValue: { name: string }) => { // Rishikojme
      this.categoryService.update({ ...category, ...formValue }).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ICategory) => {
          dialogRef.close();
          this.categories[index] = response;
          this.matSnackBar.open(`Category "${category.name}" updated successfully to "${response.name}"!`);
        },
        () => this.matSnackBar.open(`There was an error updating category "${category.name}" to "${formValue.name}"!`)
      );
    };
  }

  public deleteCategory(category: ICategory): void {
    if( category.id ) {
      this.categoryService.delete(category.id).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        () => {
          this.categories = this.categories.filter(currentCategory => currentCategory.id !== category.id);
          this.matSnackBar.open(`Category "${category.name}" has been deleted!`);
        }
      )
    }
  }
}
