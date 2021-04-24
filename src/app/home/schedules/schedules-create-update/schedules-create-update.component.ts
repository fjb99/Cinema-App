import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ObservableLike } from 'rxjs';
import { IMovie } from 'src/app/core/models/movie';
import { ITheatre } from 'src/app/core/models/theatre';
import { MovieService } from 'src/app/core/services/movie.service';
import { TheatreService } from 'src/app/core/services/theatre.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'ikub-schedules-create-update',
  templateUrl: './schedules-create-update.component.html',
  styleUrls: ['./schedules-create-update.component.scss']
})
export class SchedulesCreateUpdateComponent implements OnInit {

  form!: FormGroup;
  movies$!: Observable<Array<IMovie>>;
  theaters$!: Observable<Array<ITheatre>>;

  constructor(
    private movieService: MovieService,
    private theaterService: TheatreService
  ) { }

  ngOnInit(): void {
    this.loadMovielist();
    this.loarTheaterList();
    this.buildForm();
  }

private buildForm(): void {
  this.form = new FormGroup({
    movie: new FormControl(null, Validators.required),
    theater: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required)
  });
}

private loadMovielist() {
  this.movies$ = this.movieService.getList();
}

private loarTheaterList() {
  this.theaters$ = this.theaterService.getList();
}

public save() {

}

}
