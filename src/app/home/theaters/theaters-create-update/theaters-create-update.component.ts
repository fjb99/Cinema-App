import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ikub-theaters-create-update',
  templateUrl: './theaters-create-update.component.html',
  styleUrls: ['./theaters-create-update.component.scss']
})
export class TheatersCreateUpdateComponent implements OnInit {

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      number: new FormControl(null, Validators.required),
      capacity: new FormControl(null, Validators.required)
    });
  }

  public save(): void {
    console.log(this.form.value);
  }

}
