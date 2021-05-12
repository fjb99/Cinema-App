import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { CategoriesCreateUpdateComponent } from './categories/categories-create-update/categories-create-update.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MoviesCreateUpdateComponent } from './movies/movies-create-update/movies-create-update.component';
import { MoviesComponent } from './movies/movies.component';
import { SchedulesCreateUpdateComponent } from './schedules/schedules-create-update/schedules-create-update.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheatersCreateUpdateComponent } from './theaters/theaters-create-update/theaters-create-update.component';
import { TheatersComponent } from './theaters/theaters.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    MoviesComponent,
    SchedulesComponent,
    TheatersComponent,
    HomeComponent,
    CategoriesCreateUpdateComponent,
    MoviesCreateUpdateComponent,
    SchedulesCreateUpdateComponent,
    TheatersCreateUpdateComponent
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
      MatButtonModule,
      MatFormFieldModule,
      MatDialogModule,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatSortModule
  ],
  providers: []
})
export class HomeModule { }
