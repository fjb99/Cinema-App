import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ikub-categories-create-update',
  templateUrl: './categories-create-update.component.html',
  styleUrls: ['./categories-create-update.component.scss']
})
export class CategoriesCreateUpdateComponent implements OnInit {

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new  FormGroup({
      category: new FormControl(null, Validators.required)
    });
  }

  save() {

  }
}
