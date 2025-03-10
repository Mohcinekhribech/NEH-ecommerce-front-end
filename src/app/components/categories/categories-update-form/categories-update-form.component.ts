import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryDtoRequest } from 'src/app/core/models/CategoryDtoRequest.model';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-update-form',
  templateUrl: './categories-update-form.component.html',
  styleUrls: ['./categories-update-form.component.css']
})
export class CategoriesUpdateFormComponent {
  constructor(private categoryService: CategoryService, private messageService: MessageService) { }
  @Input() categoryDtoRequest: CategoryDtoRequest = {
    id: '',
    name: '',
    description: '',
    image: ''
  }

  putData(categoryForm:NgForm) {
    if (categoryForm.valid) {
      this.categoryService.putData(this.categoryDtoRequest, this.categoryDtoRequest.id).subscribe(
        res => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your order saved successfully' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there is a problem current the updating of the category' });
        }
      )
    }
  }
}
