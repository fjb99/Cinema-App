import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ikub-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  onConfirmFn!: (value: boolean) => void;
  constructor() { }

  ngOnInit(): void {
  }

}
