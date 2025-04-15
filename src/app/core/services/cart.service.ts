import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';
import { ProductDtoResponse } from '../models/ProductDtoResponse.model';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems: CartItem[] = this.loadCart();
  private total : number = this.calcTotalPrice();

  constructor(private messageService:MessageService){}

  // Observable to listen to cart changes
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Add product to cart
  addToCart(product: ProductDtoResponse, quantity: number = 1): void {
      const existingItem = this.cartItems.find(item => item.product.id === product.id);

      if (existingItem && (existingItem.quantity < existingItem.product.quantity)) {
          existingItem.quantity += quantity;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product added to cart' });
      } else if(!existingItem) {
          this.cartItems.push({ product, quantity });
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product added to cart' });

      }else {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'there is no more products in the stock' });
      }
      this.saveCart();
  }

  // Remove product from cart
  removeFromCart(productId: String): void {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      this.saveCart();
  }

  // Update product quantity in cart
  updateQuantity(productId: String, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
  
    if (itemIndex === -1) {
      return; // L'article n'existe pas dans le panier
    }
  
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartItems[itemIndex].quantity = quantity;
    }
  
    this.saveCart();
  }

  // Get all cart items
  getCartItems(): CartItem[] {
      return this.cartItems;
  }

  // Calculate total price
  calcTotalPrice(): number {
      this.total =  this.cartItems.reduce((total, item) => {
          return total + (item.product.finalPrice * item.quantity);
      }, 0);
      return this.total;
  }

  getTotal() : number
  {
    return this.total
  }

  // Clear cart
  clearCart(): void {
      this.cartItems = [];
      this.saveCart();
  }

  // Save cart to local storage
  private saveCart(): void {
      console.log(this.cartItems)
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
      localStorage.setItem('total', this.calcTotalPrice().toString());
      this.cartItemsSubject.next(this.cartItems);
  }

  // Load cart from local storage
  private loadCart(): CartItem[] {
      const storedCart = localStorage.getItem(this.cartKey);
      return storedCart ? JSON.parse(storedCart) : [];
  }
}
