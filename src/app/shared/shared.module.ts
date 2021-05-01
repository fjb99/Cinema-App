import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}
