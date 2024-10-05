import { Component, inject } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-page-rxjs';
  showCart$ = this.dataService.showCartObservable$;
  
  constructor(private dataService : DataService) { }
}
