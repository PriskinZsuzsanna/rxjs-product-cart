import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  showCart$ = this.dataService.showCartObservable$;
  cartObservable$ = this.dataService.itemsInCart$
    .pipe(
      tap(data => console.log(data))
    );

  constructor(private dataService: DataService) { }

  deleteItem(id: number): void {
    this.dataService.deleteItem(id);
    this.cartObservable$ = this.dataService.itemsInCart$;
  }

  toggleCart(): void {
    this.dataService.showCartSubject.next(false);
  }
}
