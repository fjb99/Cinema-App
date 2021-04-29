import { IMovie } from './movie';
import { ITheater } from './theater';

export interface ISchedule {
    id?: string;
    createdAt?: Date;
    movie?: IMovie;
    theater?: ITheater;
    price?: number;
    date?: Date;
    time?: string;
}
