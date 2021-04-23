import { Data } from '@angular/router';
import { IMovie } from './movie';
import { ITheatre } from './theatre';

export interface ISchedule {
    id: number; 
    createdAt: Data;
    movie: IMovie;
    theater: ITheatre;
    price: number;
    // ToFIX: Two time declaration: createdAt and dataTime at db 
}