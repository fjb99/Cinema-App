import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IMovie } from 'src/app/core/models/movie';
import { ISchedule } from 'src/app/core/models/schedule';
import { ITheatre } from 'src/app/core/models/theatre';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { TheatreService } from 'src/app/core/services/theatre.service';
import { SchedulesCreateUpdateComponent } from './schedules-create-update/schedules-create-update.component';

@Component({
  selector: 'ikub-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy {

  // public schedules$!: Observable<Array<ISchedule>>;
  public schedules!: Array<ISchedule>;
  public theaters$!: Observable<Array<ITheatre>>;
  public form!: FormGroup;
  private onComponentDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private theaterService: TheatreService,
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
    )
    // this.schedules$ = this.scheduleService.getList();
  }


  public loadTheaterList(): void {
    this.theaters$ = this.theaterService.getList();
  }

  public createSchedule(): void {
    //this.dialog.open(SchedulesCreateUpdateComponent);
    const dialogRef: MatDialogRef<SchedulesCreateUpdateComponent> = this.dialog.open(SchedulesCreateUpdateComponent);
    dialogRef.componentInstance.onSaveFn = (formValue: {
      movie: IMovie,
      theater: ITheatre,
      price: number,
      date: Date,
      time: Date }) => {
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

  openDetails(schedue: ISchedule): void {
    //this.dialog.open(SchedulesCreateUpdateComponent);
  }
}
