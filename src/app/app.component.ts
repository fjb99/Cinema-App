import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'ikub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$: Observable<boolean> = this.loadingService.isLoading$.pipe(debounceTime(1));

  constructor(private loadingService: LoadingService) { }
}
