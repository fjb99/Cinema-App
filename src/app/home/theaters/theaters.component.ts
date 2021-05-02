import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { ITheater } from 'src/app/core/models/theater';
import { TheaterService } from 'src/app/core/services/theater.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TheatersCreateUpdateComponent } from './theaters-create-update/theaters-create-update.component';

@Component({
  selector: 'ikub-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
})

export class TheatersComponent implements OnInit, OnDestroy {

  private onComponentDestroy$: Subject<void> = new Subject<void>();
  public theaters!: Array<ITheater>;
  // public theaters$!: Observable<Array<ITheater>>;

  constructor(
    private theaterService: TheaterService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTheaters();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  public loadTheaters(): void{
    this.theaterService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe(
      (response: Array<ICategory>) => {
        this.theaters = response;
      }
    );
    // this.theaters$ = this.theaterService.getList();
  }

  public createTheater(): void {
    // this.dialog.open(TheatersCreateUpdateComponent);
    const dialogRef: MatDialogRef<TheatersCreateUpdateComponent> = this.dialog.open(TheatersCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: ITheater) => {
      this.theaterService.create(formValue).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ITheater) => {
          dialogRef.close();
          this.theaters.push(response);
          this.matSnackBar.open(`Theater "${response.number}" created sucesfully!`);
        },
        (error) => {
          dialogRef.close();
          this.matSnackBar.open(`There was an error creating theater "${formValue.number}"!`);
        }
      );
    };
  }

  public updateTheater(theater: ITheater, index: number): void {
    const dialogRef: MatDialogRef<TheatersCreateUpdateComponent> = this.dialog.open(TheatersCreateUpdateComponent, { data: theater });
    dialogRef.componentInstance.onSaveFn = (formValue: ITheater) => {
      this.theaterService.update({ ...theater, ...formValue }).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ITheater) => {
          dialogRef.close();
          this.theaters[index] = response;
          this.matSnackBar.open(`Theater "${theater.number}" updated successfully!`, '', { panelClass: [ 'success-background', 'white-color' ] });
        },
        () => this.matSnackBar.open(`There was an error updating category "${theater.number}"!`, '', { panelClass: [ 'warn-background', 'white-color' ] })
      );
    };
  }

  public deleteTheater(theater: ITheater): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {data: `Are you sure you want to delete theater "${theater.number}"?`, role: 'alertdialog'});
    dialogRef.componentInstance.onConfirmFn = () => {
      if (theater.id) {
        this.theaterService.delete(theater.id).pipe(
          take(1),
          takeUntil(this.onComponentDestroy$)
        ).subscribe(
          () => {
            this.theaters = this.theaters.filter(currenttheater => currenttheater.id !== theater.id);
            this.matSnackBar.open(`theater "${theater.number}" has been deleted!`);
          }
        );
      }
    };
  }

}
