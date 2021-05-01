import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ikub-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  onCancelFn!: () => void;
  onConfirmFn!: () => void;

  constructor(@Inject(MAT_DIALOG_DATA) public message: string) { }
}
