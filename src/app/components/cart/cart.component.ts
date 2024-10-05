import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$ = this.dataService.getTotalQuantity();

  constructor(private dataService: DataService) { }

  toggleCart() {
    this.dataService.toggleCart();
  }
}
