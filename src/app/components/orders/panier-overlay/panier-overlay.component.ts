import { Component } from '@angular/core';
import { CartItem } from 'src/app/core/models/CartItem.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CartService } from 'src/app/core/services/cart.service';

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
