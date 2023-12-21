import { Component } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
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

  actualImageSubject = new BehaviorSubject<number>(1)
  actualImgObservable$ = this.actualImageSubject.asObservable()

  constructor(private dataService: DataService){}

  deleteItem(id:number){
    this.dataService.deleteItem(id)
    this.cartObservable$ = this.dataService.itemsInCart$
  }

  imgChange(sign: string){
    let actual = this.actualImageSubject.value
    if(sign == '+') {
     actual == 4 ?  this.actualImageSubject.next(1) :  this.actualImageSubject.next(actual + 1)
    } else {
      actual == 1 ? this.actualImageSubject.next(4) : this.actualImageSubject.next(actual -1)
    }
  }

  changeFromThumb(pic: number){
    this.actualImageSubject.next(pic)
  }

}
