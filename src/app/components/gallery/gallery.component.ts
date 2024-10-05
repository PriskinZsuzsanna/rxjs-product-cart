import { Component } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  cartObservable$ = this.dataService.itemsInCart$
    .pipe(
      tap(data => console.log(data))
    );
  actualImageSubject = new BehaviorSubject<number>(1);
  actualImgObservable$ = this.actualImageSubject.asObservable();

  constructor(private dataService: DataService) { }

  imgChange(sign: string): void {
    let actual = this.actualImageSubject.value;
    if (sign == '+') {
      actual == 4 ? this.actualImageSubject.next(1) : this.actualImageSubject.next(actual + 1);
      return;
    }
    actual == 1 ? this.actualImageSubject.next(4) : this.actualImageSubject.next(actual - 1);
  }

  changeFromThumb(pic: number): void {
    this.actualImageSubject.next(pic);
  }
}
