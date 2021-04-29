import { Component, OnDestroy, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/core/models/category';
import { ITheatre } from 'src/app/core/models/theatre';
import { TheatreService } from 'src/app/core/services/theatre.service';
import { TheatersCreateUpdateComponent } from './theaters-create-update/theaters-create-update.component';

@Component({
  selector: 'ikub-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
})

export class TheatersComponent implements OnInit, OnDestroy {

  private onComponentDestroy$: Subject<void> = new Subject<void>();
  public theaters!: Array<ITheatre>;
  // public theaters$!: Observable<Array<ITheatre>>;

  constructor(
    private theaterService: TheatreService,
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
  };

  public loadTheaters(): void{
    this.theaterService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe(
      (response: Array<ICategory>) => {
        this.theaters = response;
      }
    )
    // this.theaters$ = this.theaterService.getList();
  }

  public createTheater(): void {
    // this.dialog.open(TheatersCreateUpdateComponent);
    const dialogRef: MatDialogRef<TheatersCreateUpdateComponent> = this.dialog.open(TheatersCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: {number: number, capacity: number}) => {
      this.theaterService.create(formValue).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ITheatre) => {
          dialogRef.close();
          this.theaters.push(response);
          this.matSnackBar.open(`Theater "${response.number}" created sucesfully!`);
        },
        (error) => {
          dialogRef.close();
          this.matSnackBar.open(`There was an error creating theater "${formValue.number}"!`)
        }
      );
    }
  }

  public updateTheater(theater: ITheatre, index: number): void {
    const dialogRef: MatDialogRef<TheatersCreateUpdateComponent> = this.dialog.open(TheatersCreateUpdateComponent, { data: theater });
    dialogRef.componentInstance.onSaveFn = (formV: {number: number, capacity: number}) => {
      this.theaterService.update({...theater, ...formV}).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ITheatre) => {
          dialogRef.close();
          this.theaters[index] = response;
          this.matSnackBar.open(`Theater "${theater.number}" updated successfully to "${response.number}"!`);
        },
        () => this.matSnackBar.open(`There was an error updating category "${theater.number}" to "${formV.number}"!`)
      );
    }
  }

  public deleteTheater(theater: ITheatre): void {
    if( theater.id ) {
      this.theaterService.delete(theater.id).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        () => {
          this.theaters = this.theaters.filter(currenttheater => currenttheater.id !== theater.id);
          this.matSnackBar.open(`theater "${theater.number}" has been deleted!`);
        }
      )
    }
  }
}



