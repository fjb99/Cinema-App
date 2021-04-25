import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/core/models/category';

@Component({
  selector: 'ikub-categories-create-update',
  templateUrl: './categories-create-update.component.html',
  styleUrls: ['./categories-create-update.component.scss']
})
export class CategoriesCreateUpdateComponent implements OnInit {
  form!: FormGroup;
  onSaveFn!: (formValue: { name: string }) => void;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedCategory: ICategory | undefined | null) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new  FormGroup({
      name: new FormControl(this.selectedCategory?.name ?? null, Validators.required)
    });
  }
}
