import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ISchedule } from 'src/app/core/models/schedule';
import { ITheater } from 'src/app/core/models/theater';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { TheaterService } from 'src/app/core/services/theater.service';
import { SchedulesCreateUpdateComponent } from './schedules-create-update/schedules-create-update.component';

@Component({
  selector: 'ikub-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy {

  // public schedules$!: Observable<Array<ISchedule>>;
  public schedules!: Array<ISchedule>;
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
        this.schedules = response;
      }
    );
    // this.schedules$ = this.scheduleService.getList();
  }


  public loadTheaterList(): void {
    this.theaters$ = this.theaterService.getList();
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
          this.matSnackBar.open(`Schedule for "${response.movie}" movie created successfully!`);
        },
        () => this.matSnackBar.open(`There was an error creating schedule for movie "${formValue.movie}"!`)
      );
    };
  }

  public updateSchedule(schedule: ISchedule, index: number): void {
    const dialogRef: MatDialogRef<SchedulesCreateUpdateComponent> = this.dialog.open(SchedulesCreateUpdateComponent, { data: schedule });
    dialogRef.componentInstance.onSaveFn = (formValue: ISchedule) => {
      this.scheduleService.update({ ...schedule, ...formValue }).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: ISchedule) => {
          dialogRef.close();
          this.schedules[index] = response;
          this.schedules = [ ...this.schedules ]; // To trigger table update by re-assigning the schedules array that we pass as "dataSource" to the material table
          this.matSnackBar.open(`Schedule for "${response.movie?.name}" movie updated successfully!`);
        },
        () => this.matSnackBar.open(`There was an error updating schedule for movie "${formValue.movie?.name}"!`)
      );
    };
  }
}
