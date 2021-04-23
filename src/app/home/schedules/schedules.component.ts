import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchedule } from 'src/app/core/models/schedule';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'ikub-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  public schedules$!: Observable<Array<ISchedule>>;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  private loadSchedules(): void {
    this.schedules$ = this.scheduleService.getlist();
  }

  public add(): void {

  }
}
