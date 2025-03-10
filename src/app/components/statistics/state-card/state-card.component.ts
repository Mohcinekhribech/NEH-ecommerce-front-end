import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state-card',
  templateUrl: './state-card.component.html',
  styleUrls: ['./state-card.component.css']
})
export class StateCardComponent {
  @Input() numberState:number=0
  @Input() titleState:String=''
  @Input() stateIcon:String=''
  @Input() iconColor:String=''
  @Input() iconBgColor:String=''
  ngOnInit()
  {
    console.log(this.numberState)
    console.log(this.titleState)
    console.log(this.stateIcon)
    console.log(this.iconBgColor)
    console.log(this.iconColor)
  }
}
