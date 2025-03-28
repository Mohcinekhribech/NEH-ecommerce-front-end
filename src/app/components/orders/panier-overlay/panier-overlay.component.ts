import { Component } from '@angular/core';
import { CartItem } from 'src/app/core/models/CartItem.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-panier-overlay',
  templateUrl: './panier-overlay.component.html',
  styleUrls: ['./panier-overlay.component.css']
})
export class PanierOverlayComponent {
  show:boolean = false;
  total:number = 0;
  cartItems:CartItem[]=[]
  itemNum:string = ''
  apiUrl = environment.apiUrl;
  constructor(private cartService:CartService){
  }

  ngOnInit()
  {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.itemNum = this.cartItems.length.toString()
      this.total = this.cartService.calcTotalPrice();
    });
  }

  removeProduct(productId : String)
  {
    console.log("msse7")
    this.cartService.removeFromCart(productId)
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }

  addOne(cartItem : CartItem)
  {
    console.log("zid")
    if(cartItem.quantity+1 <= cartItem.product.quantity)
      this.cartService.updateQuantity(cartItem.product.id,cartItem.quantity++)
  }

  removeOne(cartItem : CartItem)
  {
    console.log("n9ess")
      this.cartService.updateQuantity(cartItem.product.id,cartItem.quantity--)
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
