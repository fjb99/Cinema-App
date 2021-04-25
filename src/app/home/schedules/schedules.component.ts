import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
export class SchedulesComponent implements OnInit {

  public schedules$!: Observable<Array<ISchedule>>;
  public theaters$!: Observable<Array<ITheatre>>;
  public form!: FormGroup;

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private theaterService: TheatreService
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
    this.loadTheaterList();
    this.buldForm();
  }

  private buldForm(): void {
    this.form = new FormGroup({
      movieName: new FormControl(),
      theater: new FormControl()
    });
  }

  private loadSchedules(): void {
    this.schedules$ = this.scheduleService.getlist();
  }


  public loadTheaterList(): void {
    this.theaters$ = this.theaterService.getList();
  }

  public add(): void {
    this.dialog.open(SchedulesCreateUpdateComponent);
  }
}
