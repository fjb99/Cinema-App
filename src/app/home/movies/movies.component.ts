import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'ikub-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies$!: Observable<Array<IMovie>>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies(); 
  }

  public loadMovies(): void {
    this.movies$ = this.movieService.getList(); 
  }


}
