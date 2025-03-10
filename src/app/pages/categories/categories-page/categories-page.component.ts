import { Component, ViewChild } from '@angular/core';
import { CategoriessTableComponent } from 'src/app/components/categories/categoriess-table/categoriess-table.component';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent {
  showAddForm:boolean = false;
  @ViewChild(CategoriessTableComponent) categoriesTableComponent : CategoriessTableComponent | undefined;
  closeModal(data: any) {
    this.showAddForm = false;
  }
  ngOnInit()
  {
    this.categoriesTableComponent?.ngOnInit();
  }
}
