import { Component, Input } from '@angular/core';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() category:CategoryDtoResponse = {
    id: '',
    name: '',
    image: '',
    description: '',
    products: []
  }
}
