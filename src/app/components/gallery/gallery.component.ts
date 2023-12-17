import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  showCart$ = this.dataService.showCartObservable$
  cartObservable$ = this.dataService.itemsInCart$.pipe(
    tap(data => console.log(data))
  )

  constructor(private dataService: DataService){}

}
