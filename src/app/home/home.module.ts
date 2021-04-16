import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheatersComponent } from './theaters/theaters.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriesCreateUpdateComponent } from './categories/categories-create-update/categories-create-update.component';
import {SharedModule} from '../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

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
      HomeRoutingModule,
      SharedModule,
      MatSidenavModule,
      MatCardModule,
      MatTableModule,
      MatDividerModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatButtonModule
       
  ]
})
export class HomeModule { }
