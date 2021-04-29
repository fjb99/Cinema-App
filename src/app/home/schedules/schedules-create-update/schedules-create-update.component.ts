import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
import { IMovie } from 'src/app/core/models/movie';
import { ISchedule } from 'src/app/core/models/schedule';
import { ITheatre } from 'src/app/core/models/theatre';
import { MovieService } from 'src/app/core/services/movie.service';
import { TheatreService } from 'src/app/core/services/theatre.service';

@Component({
  selector: 'ikub-schedules-create-update',
  templateUrl: './schedules-create-update.component.html',
  styleUrls: ['./schedules-create-update.component.scss']
})
export class SchedulesCreateUpdateComponent implements OnInit {

  form!: FormGroup;
  movies$!: Observable<Array<IMovie>>;
  theaters$!: Observable<Array<ITheatre>>;

  onSaveFn!: (formValue: {
    movie: IMovie,
    theater: ITheatre,
    price: number,
    date: Date,
    time: Date
  }) => void;

  constructor(
    private movieService: MovieService,
    private theaterService: TheatreService,
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
    date: new FormControl(this.selectedSchedule?.dateTime, Validators.required),
    time: new FormControl(this.selectedSchedule?.dateTime, Validators.required)
  });
}

private loadMovielist(): void {
  this.movies$ = this.movieService.getList();
}

private loarTheaterList(): void {
  this.theaters$ = this.theaterService.getList();
}

//public save(): void {
//  console.log(this.form.value);
//}

}
