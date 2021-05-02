import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
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
  public isLoading!: boolean;
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
    this.isLoading = true;
    this.categoryService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$),
      finalize(() => this.isLoading = false)
    ).subscribe(
      (response: Array<ICategory>) => this.categories = response,
      () => this.matSnackBar.open('Error loading Category list!', 'Dismiss', { duration: 0, panelClass: [ 'warn-background', 'white-color' ] })
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
            this.matSnackBar.open(`Category "${response.name}" created successfully!`);
          },
          () => this.matSnackBar.open(`There was an error creating category "${formValue.name}"!`)
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
            this.matSnackBar.open(`Category "${category.name}" updated successfully to "${response.name}"!`);
          },
          () => this.matSnackBar.open(`There was an error updating category "${category.name}" to "${formValue.name}"!`)
        );
      }
    };
  }

  public deleteCategory(category: ICategory): void {
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
          () => this.matSnackBar.open(`There was an error deleting category "${category.name}!`)
        );
      } else {
        dialogRef.close();
      }
    };
  }


}
