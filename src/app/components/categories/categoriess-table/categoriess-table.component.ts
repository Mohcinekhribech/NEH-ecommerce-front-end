import { Component } from '@angular/core';
import { CategoryDtoRequest } from 'src/app/core/models/CategoryDtoRequest.model';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriess-table',
  templateUrl: './categoriess-table.component.html',
  styleUrls: ['./categoriess-table.component.css']
})
export class CategoriessTableComponent {

  constructor(private categoryService:CategoryService){}
  categories : CategoryDtoResponse[] = []
  showUpdateForm:boolean = false;
  selectedCategory:CategoryDtoRequest ={
    name: '',
    description: '',
    id: '',
    image: ''
  }

  ngOnInit()
  {
    this.categoryService.getSomeData()
    .subscribe(res => {
      this.categories = res
    })
  }

  closeModal(data: any) {
    this.showUpdateForm = false;
    this.selectedCategory = {
      id : '',
      name : '',
      description : '',
      image:''
    }
  }

  deleteItem(id: String): void {
    this.categories = this.categories.filter(item => item.id !== id);
  }

  updateCategory(category : CategoryDtoRequest)
  {
    this.selectedCategory = category 
    this.showUpdateForm = true
  }

  deleteCategory(id:String)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteData(id).subscribe(
          res => {
            this.deleteItem(id);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        );
      }
    });
  }
}