  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheatersComponent } from './theaters/theaters.component';

const routes: Routes = [
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'movies', component: MoviesComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'schedules', component: SchedulesComponent },
    { path: 'theaters', component: TheatersComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

