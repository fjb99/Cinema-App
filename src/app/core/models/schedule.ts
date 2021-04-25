import { Data } from '@angular/router';
import { IMovie } from './movie';
import { ITheatre } from './theatre';

export interface ISchedule {
    id?: string;
    createdAt?: Data;
    movie?: IMovie;
    theater?: ITheatre;
    price?: number;
    dateTime?: Data;
}