import { ICategory } from './category';

export interface IMovie {
    id?: string;
    name?: string;
    category?: ICategory;
    description?: string;
    imageUrl?: string;
    rating?: number;
    createdAt?: Date;
    year?: number;
}