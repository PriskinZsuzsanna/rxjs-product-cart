import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  isOpenSubject = new BehaviorSubject<boolean>(false)

  openClose(){
    let actual = this.isOpenSubject.value
    this.isOpenSubject.next(!actual)
  }
}
