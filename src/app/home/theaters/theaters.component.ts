import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheatre } from 'src/app/core/models/theatre';
import { TheatreService } from 'src/app/core/services/theatre.service';

@Component({
  selector: 'ikub-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
})

export class TheatersComponent implements OnInit {

  public theaters$!: Observable<Array<ITheatre>>;

  constructor(private theaterService: TheatreService) { }

  ngOnInit(): void {
    this.loadTheaters(); 
  }

  public loadTheaters(): void{
    this.theaters$ = this.theaterService.getList();
  }

}



