import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/types/interface';
import {BehaviorSubject, map, tap} from 'rxjs'

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  
  actual$ = this.dataService.actual$

  constructor(private dataService: DataService){

  }
}
