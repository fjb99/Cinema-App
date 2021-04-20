import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ITheatre } from 'src/app/core/models/theatre';
import { TheatreService } from 'src/app/core/services/theatre.service';
import { TheatersCreateUpdateComponent } from './theaters-create-update/theaters-create-update.component';

@Component({
  selector: 'ikub-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
})

export class TheatersComponent implements OnInit {

  public theaters$!: Observable<Array<ITheatre>>;

  constructor(
    private theaterService: TheatreService,
    private dialog: MatDialog  
  ) { }

  ngOnInit(): void {
    this.loadTheaters(); 
  }

  public loadTheaters(): void{
    this.theaters$ = this.theaterService.getList();
  }

  public add(): void {
    this.dialog.open(TheatersCreateUpdateComponent);
  }
}



