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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoviesCreateUpdateComponent } from './movies/movies-create-update/movies-create-update.component';
import { SchedulesCreateUpdateComponent } from './schedules/schedules-create-update/schedules-create-update.component';
import { TheatersCreateUpdateComponent } from './theaters/theaters-create-update/theaters-create-update.component';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
      MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000
      } as MatSnackBarConfig
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: true
      } as MatDialogConfig
    }
  ]
})
export class HomeModule { }
