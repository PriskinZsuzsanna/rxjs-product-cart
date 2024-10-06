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
  isLoading: boolean = false;

  constructor(private dataService: DataService) { }

  addToCart(id: number):void {
    this.isLoading = true;
    this.dataService.addToCart(id);
    setTimeout(() => {
      this.isLoading = false;
      this.dataService.toggleCart();
    }, 1500)
  }

  count(action: string): void {
    this.dataService.count(action);
  }
}
