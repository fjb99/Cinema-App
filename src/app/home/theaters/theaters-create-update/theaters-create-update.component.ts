import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITheater } from 'src/app/core/models/theater';

@Component({
  selector: 'ikub-theaters-create-update',
  templateUrl: './theaters-create-update.component.html',
  styleUrls: ['./theaters-create-update.component.scss']
})
export class TheatersCreateUpdateComponent implements OnInit {

  form!: FormGroup;
  // To use at parent compnent
  onSaveFn!: (formValue: ITheater) => void;

  // To use at child componen, to check if form is new or edit
  constructor(@Inject(MAT_DIALOG_DATA) public selectedTheater: ITheater | undefined | null) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      number: new FormControl(this.selectedTheater?.number, Validators.required),
      capacity: new FormControl(this.selectedTheater?.capacity, Validators.required)
    });
  }
}
