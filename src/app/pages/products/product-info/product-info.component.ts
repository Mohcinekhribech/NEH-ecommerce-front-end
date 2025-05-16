import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent {
  constructor(public productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private router: Router, private titleService: Title, private metaService: Meta) { }
  productId: string | null = '';
  apiUrl = environment.apiUrl;
  product: ProductDtoResponse = {
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
  selectedImage: String = ""
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId)
        this.productService.getOneProduct(this.productId)
          .subscribe(res => {
            this.product = res;
            this.titleService.setTitle( this.product.name +' | Neh Cosmetics');
            this.metaService.updateTag({
              name: 'description',
              content:' '+this.product.description+''
            });
            this.metaService.updateTag({
              property: 'og:title',
              content: this.product.name +' | Neh Cosmetics'
            });
          
            this.metaService.updateTag({
              property: 'og:description',
              content: ' '+this.product.description+''
            });

            this.metaService.updateTag({
              property: 'og:image',
              content: 'https://neh-cosmetics.com/upload/'+this.product.productMedias[0].mediaName
            });
            this.selectedImage = this.product.productMedias[0].mediaName
          })
    });
  }

  selectAnImage(imageLink: String) {
    this.selectedImage = imageLink
  }
  addToCart(product: ProductDtoResponse) {
    this.cartService.addToCart(product)
  }
}
