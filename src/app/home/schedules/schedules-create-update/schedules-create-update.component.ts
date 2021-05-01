import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { IMovie } from 'src/app/core/models/movie';
import { ISchedule } from 'src/app/core/models/schedule';
import { ITheater } from 'src/app/core/models/theater';
import { MovieService } from 'src/app/core/services/movie.service';
import { TheaterService } from 'src/app/core/services/theater.service';

@Component({
  selector: 'ikub-schedules-create-update',
  templateUrl: './schedules-create-update.component.html',
  styleUrls: ['./schedules-create-update.component.scss']
})
export class SchedulesCreateUpdateComponent implements OnInit {
  form!: FormGroup;
  movies$!: Observable<Array<IMovie>>;
  theaters$!: Observable<Array<ITheater>>;

  onSaveFn!: (formValue: ISchedule) => void;
  onDeleteRequestedFn!: () => void;

  constructor(
    private movieService: MovieService,
    private theaterService: TheaterService,
    @Inject(MAT_DIALOG_DATA) public selectedSchedule: ISchedule | undefined | null
  ) { }

  ngOnInit(): void {
    this.loadMovielist();
    this.loarTheaterList();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      movie: new FormControl(this.selectedSchedule?.movie, Validators.required),
      theater: new FormControl(this.selectedSchedule?.theater, Validators.required),
      price: new FormControl(this.selectedSchedule?.price, Validators.required),
      date: new FormControl(this.selectedSchedule?.date, Validators.required),
      time: new FormControl(this.selectedSchedule?.time, Validators.required)
    });
  }

  private loadMovielist(): void {
    this.movies$ = this.movieService.getList();
  }

  private loarTheaterList(): void {
    this.theaters$ = this.theaterService.getList();
  }

  public compareWithIdForDropdownFn = (a: IMovie | ITheater, b: IMovie | ITheater): boolean => a?.id === b?.id;

  // public compareWithObjectForDropdownFn = (a: IMovie | ITheater, b: IMovie | ITheater): boolean => a && b && JSON.stringify(a) === JSON.stringify(b);
}
