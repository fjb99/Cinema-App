import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ikub-loading-spinner',
  templateUrl: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
