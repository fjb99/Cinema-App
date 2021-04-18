import { ICategory } from './category';

export interface IMovie {
    id: number; 
    name: string; 
    category: ICategory;
    description: string; 
    imageURL: string; 
    rating: string; 
    createdAt: Date; 
}