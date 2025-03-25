import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product:ProductDtoResponse = {
    id: '',
    name: '',
    quantity: 0,
    weight: 0,
    purchasePrice: 0,
    finalPrice: 0,
    category: null,
    description: '',
    tags: [],
    productMedias: [],
    benefits: '',
    howToUse: ''
  }
  apiUrl = environment.apiUrl;
  constructor(private cartService:CartService,private messageService : MessageService){}

  addToCart(product : ProductDtoResponse)
  {
    this.cartService.addToCart(product)
  }
}
