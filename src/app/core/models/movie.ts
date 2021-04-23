import { ICategory } from './category';

export interface IMovie {
    id: string;
    name: string;
    category: ICategory;
    description: string;
    imageUrl: string;
    rating: string;
    createdAt: Date;
    year: number;
}