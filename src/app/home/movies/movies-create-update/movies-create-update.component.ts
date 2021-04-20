import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ikub-movies-create-update',
  templateUrl: './movies-create-update.component.html',
  styleUrls: ['./movies-create-update.component.scss']
})
export class MoviesCreateUpdateComponent implements OnInit {

  options!: FormGroup;
  categoryControl = new FormControl('primary'); 

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      category: this.categoryControl
    });
  }

  ngOnInit(): void {
  }

}
