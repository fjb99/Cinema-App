import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ISchedule } from 'src/app/core/models/schedule';
import { ITheater } from 'src/app/core/models/theater';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { TheaterService } from 'src/app/core/services/theater.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SchedulesCreateUpdateComponent } from './schedules-create-update/schedules-create-update.component';

@Component({
  selector: 'ikub-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy, AfterViewInit {
  // public schedules$!: Observable<Array<ISchedule>>;
  public allSchedules!: Array<ISchedule>;
  public schedules!: Array<ISchedule>;
  public dataSource: MatTableDataSource<ISchedule> = new MatTableDataSource<ISchedule>();
  @ViewChild(MatSort, { static: false }) matSort!: MatSort;
  public theaters$!: Observable<Array<ITheater>>;
  public form!: FormGroup;
  private onComponentDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private theaterService: TheaterService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
    this.loadTheaterList();
    this.buldForm();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.matSort;
    }
  }

  private setMatTableDataSource(schedules: Array<ISchedule> = this.schedules): void {
    this.dataSource.data = schedules;
    if (!this.dataSource.sort) {
      this.dataSource.sort = this.matSort;
    }
    this.dataSource.sortingDataAccessor = (data: ISchedule, sortByPropertyName: string) => {
      const value: any = this.getPropertyValue(data, sortByPropertyName);
      return typeof value === 'string' ? value.toLowerCase() : value; // Ignore case during sort on strings
    };
  }

  private getPropertyValue = (object: any, key: string): any => key.split('.').length ? key.split('.').reduce((acc, curr) => acc && acc[curr] || null, object) : object[key];

  private buldForm(): void {
    this.form = new FormGroup({
      movieName: new FormControl(),
      theater: new FormControl()
    });
  }

  private loadSchedules(): void {
    this.scheduleService.getList().pipe(
      take(1),
      takeUntil(this.onComponentDestroy$)
    ).subscribe(
      (response: Array<ISchedule>) => {
        this.allSchedules = response;
        this.schedules = response;
        this.setMatTableDataSource();
      },
      () => this.matSnackBar.open('Error loading Schedule List!', 'Dismiss', { duration: 0, panelClass: [ 'warn-background', 'white-color' ] })
    );
    // this.schedules$ = this.scheduleService.getList();
  }


  public loadTheaterList(): void {
    this.theaters$ = this.theaterService.getList();
  }

  public search(): void {
    const movieName: string | null | undefined = this.form.get('movieName')?.value;
    const theater: ITheater | null | undefined = this.form.get('theater')?.value;
    this.schedules = this.allSchedules?.filter((schedule: ISchedule) => {
      let movieNameMatches = true;
      if (movieName?.trim()?.length) {
        movieNameMatches = !!schedule.movie?.name?.toLowerCase()?.includes(movieName.trim().toLowerCase());
      }
      let theaterMatches = true;
      if (theater) {
        theaterMatches = schedule.theater?.number === theater.number;
      }
      return movieNameMatches && theaterMatches;
    });
    this.setMatTableDataSource();
  }

  public createSchedule(): void {
    const dialogRef: MatDialogRef<SchedulesCreateUpdateComponent> = this.dialog.open(SchedulesCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: ISchedule) => {
      this.scheduleService.create(formValue).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ISchedule) => {
          dialogRef.close();
          this.schedules.push(response);
          this.setMatTableDataSource();
          this.matSnackBar.open(`Schedule for "${response.movie?.name}" movie created successfully!`, '',  { panelClass: [ 'success-background', 'white-color' ] });
        },
        () => this.matSnackBar.open(`There was an error creating schedule for movie "${formValue.movie?.name}"!`)
      );
    };
  }

  public updateOrDeleteSchedule(schedule: ISchedule, index: number): void {
    const dialogRef: MatDialogRef<SchedulesCreateUpdateComponent> = this.dialog.open(SchedulesCreateUpdateComponent, { data: schedule, role: 'dialog' });
    dialogRef.componentInstance.onSaveFn = (formValue: ISchedule) => {
      this.scheduleService.update({ ...schedule, ...formValue }).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ISchedule) => {
          dialogRef.close();
          this.schedules[index] = response;
          this.setMatTableDataSource();
          this.matSnackBar.open(`Schedule for "${response.movie?.name}" movie updated successfully!`, '',  { panelClass: [ 'success-background', 'white-color' ] });
        },
        () => this.matSnackBar.open(`There was an error updating schedule for movie "${formValue.movie?.name}"!`)
      );
    };
    dialogRef.componentInstance.onDeleteRequestedFn = () => {
      const confirmDialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, { data: `Are you sure you want to delete schedule for movie "${schedule.movie?.name}?"`, role: 'alertdialog' });
      confirmDialogRef.componentInstance.onConfirmFn = () => {
        if (schedule.id) {
          this.scheduleService.delete(schedule.id).pipe(
            take(1),
            takeUntil(this.onComponentDestroy$)
          ).subscribe(
            () => {
              confirmDialogRef.close();
              dialogRef.close();
              this.schedules = this.schedules.filter(currentSchedule => currentSchedule.id !== schedule.id);
              this.setMatTableDataSource();
              this.matSnackBar.open(`Schedule for movie "${schedule.movie?.name}" has been deleted successfully!`);
            },
            () => this.matSnackBar.open(`There was an error deleting schedule for movie "${schedule.movie?.name}!`)
          );
        } else {
          confirmDialogRef.close();
          dialogRef.close();
        }
      };
    };
  }
}
