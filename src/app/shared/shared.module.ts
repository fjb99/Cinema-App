import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [LoadingSpinnerComponent, PagenotFoundComponent, PageNotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
