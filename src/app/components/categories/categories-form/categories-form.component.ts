import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { CategoryDtoRequest } from 'src/app/core/models/CategoryDtoRequest.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { UploadService } from 'src/app/core/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent {
  @Output() notifyParent = new EventEmitter<void>();
  constructor(private categoryService:CategoryService,private uploadService:UploadService, private router :Router,private messageService:MessageService){}
  categoryDtoRequest : CategoryDtoRequest ={
    name: '',
    description: '',
    id: '',
    image: ''
  }
  images: any[] = [];
  numOfFiles: number = 0;
  picFiles: any[] = [];


  postData(categoryForm:NgForm) {
    if (categoryForm.valid){
      this.uploadService.postData(this.picFiles).pipe(
        switchMap((res: any[]) => {
          res.forEach((mediaLink: any) => {
            this.categoryDtoRequest.image = mediaLink;
          });
          return this.categoryService.postData(this.categoryDtoRequest)
        })
      ).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'la catégorie a été enregistrée avec succès' });
            this.notifyParent.emit();
          },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'il y a un problème actuellement la création de la catégorie' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "le formulaire n'est pas valide" });
    }
  }




  removePicture(i: number) {
    this.images.splice(i, 1);
    if (this.picFiles && this.picFiles.length > i) {
      this.picFiles.splice(i, 1);
    }
  }

  addImage(fileInput: any) {
    const files = fileInput.files;
    if (files) {
      this.images = []; // Clear previous images
      this.picFiles = []; // Clear previous files
      this.numOfFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result);
        };
        reader.readAsDataURL(files[i]);
        this.picFiles.push(files[i]); // Store files in the files array
      }
    }
  }
}
