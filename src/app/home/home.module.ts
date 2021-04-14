import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheatersComponent } from './theaters/theaters.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriesCreateUpdateComponent } from './categories/categories-create-update/categories-create-update.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    MoviesComponent,
    SchedulesComponent,
    TheatersComponent,
    HomeComponent,
    CategoriesCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
