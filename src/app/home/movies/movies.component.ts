import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { MoviesCreateUpdateComponent } from './movies-create-update/movies-create-update.component';

@Component({
  selector: 'ikub-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies$!: Observable<Array<IMovie>>;

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMovies(); 
  }

  public loadMovies(): void {
    this.movies$ = this.movieService.getList(); 
  }

  public add(): void {
    this.dialog.open(MoviesCreateUpdateComponent); 
  }

}
