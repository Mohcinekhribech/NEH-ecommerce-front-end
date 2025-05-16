import { Component } from '@angular/core';
import { CartItem } from 'src/app/core/models/CartItem.model';
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent {
    total:number = 0;
    cartItems:CartItem[]=[]
    apiUrl = environment.apiUrl;
    constructor(private cartService:CartService){
    }
  
    ngOnInit()
    {
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.total = this.cartService.calcTotalPrice();
      });
    }
  
    removeProduct(productId : String)
    {
      this.cartService.removeFromCart(productId)
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }
  
  
    numtest:number = 0
    plus()
    {
      this.numtest++
    }
    manus()
    {
      this.numtest--
    }
}
