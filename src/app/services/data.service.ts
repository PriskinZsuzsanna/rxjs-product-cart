import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, share, switchMap, tap, filter} from 'rxjs/operators'
import { Cart, Item } from '../types/interface';
import { BehaviorSubject, EMPTY, Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  actualCount: number = 0
  data$= this.http.get<any>('assets/data.json').pipe(
    map(data => data.items),
    //tap(data => console.log(data)),
    share(),
    catchError(err => {
      console.log(err)
      return EMPTY
    })
  )

  idParam:number  = 1

  actual$ = this.data$.pipe(
    map((data : Item[]) => data.find(item => item.id === this.idParam))
  )

  chartNumberSubject = new BehaviorSubject<number>(0)
  chartNumberObservable$ = this.chartNumberSubject.asObservable()

  cartSubject = new BehaviorSubject<{id: number, quantity: number}[]>([])
  cartObservable$ = this.cartSubject.asObservable()

  itemsInCartSubject = new BehaviorSubject<number>(0)
  itemsInCartObservable$ = this.itemsInCartSubject.asObservable()

  showCartSubject = new BehaviorSubject<boolean>(false)
  showCartObservable$ = this.showCartSubject.asObservable()

  itemsInCart$ = this.cartObservable$.pipe(
    switchMap(items =>
      forkJoin(
        items.map(item =>
          this.data$.pipe(
            map(dataItems => {
              const dataItem = dataItems.find((data:Item) => data.id === item.id);
              return dataItem ? { ...dataItem, quantity: item.quantity } : null;
            }),
          )
        )
      )
    )
  );
  constructor(private http: HttpClient) { }

  
  count(action:string){
    this.chartNumberObservable$.subscribe(t => this.actualCount = t)
    if(action === '+'){
      this.chartNumberSubject.next(this.actualCount + 1)
    } else {
      if(this.actualCount == 0){
        this.chartNumberSubject.next(this.actualCount)
      } else {
        this.chartNumberSubject.next(this.actualCount - 1)
      }
    }
  }

  addToCart(id:number){
    const quantity = this.chartNumberSubject.value
    const currentItems = this.cartSubject.value;
    const existingItem = currentItems.find((cartItem) => cartItem.id === id)
    const newId = this.idParam

    if(existingItem){
      existingItem.quantity = quantity
    } else {
      currentItems.push({id, quantity})
    }

    this.cartSubject.next([...currentItems])
    
  }

  getTotalQuantity(){
    return this.cartObservable$.pipe(
      map((cartItems) => cartItems.reduce((sum, item) => sum + item.quantity, 0))
    )
  }

  toggleCart(){
    const current = this.showCartSubject.value
    console.log(current)
    this.showCartSubject.next(!current)
  }

  deleteItem(id: number): void {
    const currentItems = this.cartSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== id);
  
    this.cartSubject.next(updatedItems);
  
    if (updatedItems.length === 0) {
      this.toggleCart();
    }
  }

}
