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
  cartObservable$ = this.dataService.itemsInCart$;

  constructor(private dataService: DataService) { }

  deleteItem(id: number, event: Event): void {
    event.stopPropagation();
    this.dataService.deleteItem(id);
    this.cartObservable$ = this.dataService.itemsInCart$;
  }

  closeModal(): void {
    this.dataService.showCartSubject.next(false);
  }
}
