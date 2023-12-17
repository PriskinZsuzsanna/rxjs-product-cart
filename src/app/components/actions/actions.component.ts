import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

  id: number = this.dataService.idParam
  number$ = this.dataService.chartNumberObservable$
  chart$ = this.dataService.cartObservable$

  constructor(private dataService: DataService){}

  addToCart(id:number){
    this.dataService.addToCart(id)
  }

  count(action:string){
    this.dataService.count(action)
  }
}
