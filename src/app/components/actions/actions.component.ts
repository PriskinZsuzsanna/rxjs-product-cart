import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

  id: number = this.dataService.idParam;
  number$ = this.dataService.chartNumberObservable$;
  chart$ = this.dataService.cartObservable$;

  constructor(private dataService: DataService) { }

  addToCart(id: number):void {
    this.dataService.addToCart(id);
  }

  count(action: string): void {
    this.dataService.count(action);
  }
}
