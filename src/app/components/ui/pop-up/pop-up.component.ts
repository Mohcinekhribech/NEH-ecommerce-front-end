import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  @Output() closeEvent = new EventEmitter<boolean>();
  closeModal()
  {
      this.closeEvent.emit(false) ;
  }
}
