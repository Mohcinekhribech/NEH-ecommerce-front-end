import { NgModule } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [NgxPayPalModule],
  exports : [NgxPayPalModule]
})
export class PaypalModule { }