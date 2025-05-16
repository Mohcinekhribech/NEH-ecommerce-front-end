import { Component, Input } from '@angular/core';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  apiUrl = environment.apiUrl;
  @Input() category:CategoryDtoResponse = {
    id: '',
    name: '',
    image: '',
    description: '',
    products: []
  }
}
