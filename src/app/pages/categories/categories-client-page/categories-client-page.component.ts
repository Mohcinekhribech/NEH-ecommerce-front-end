import { Component } from '@angular/core';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories-client-page',
  templateUrl: './categories-client-page.component.html',
  styleUrls: ['./categories-client-page.component.css']
})
export class CategoriesClientPageComponent {
  constructor(private categoryService:CategoryService){}
    categories:CategoryDtoResponse[]=[]
  
    ngOnInit()
    {
      this.categoryService.getSomeData()
      .subscribe(res => {
        this.categories = res
      })
    }
}
