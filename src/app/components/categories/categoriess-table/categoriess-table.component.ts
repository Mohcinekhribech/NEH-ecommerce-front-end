import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  constructor(private categoryService:CategoryService,private messageService: MessageService, private confirmationService: ConfirmationService){}
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

  deleteCategory(id:String,event:Event)
  {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: ' Yes ',
      rejectLabel: ' No ',
      acceptButtonStyleClass: 'bg-[#8DB600] text-white px-2',
      rejectButtonStyleClass: 'mr-2.5 bg-grat-200 border px-2',
      accept: () => {
        this.categoryService.deleteData(id).subscribe(
          res => {
            this.deleteItem(id)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'the category deleted', life: 3000 });
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'You have cancel the deletion', life: 3000 });
      }
    });

  }
}