import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { ProductDtoRequest } from 'src/app/core/models/ProductDtoRequest.model';
import { ProductMediaDtoRequest } from 'src/app/core/models/ProductMediaDtoRequest.model';
import { TagDtoRequest } from 'src/app/core/models/TagDtoRequest.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductMediaService } from 'src/app/core/services/product-media.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TagService } from 'src/app/core/services/tag.service';
import { UploadService } from 'src/app/core/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  constructor(private productMediaService:ProductMediaService ,private messageService:MessageService , private tagService:TagService,private uploadService:UploadService,private productService:ProductService, private categoryService : CategoryService, private router :Router){}
  images: any[] = [];
  numOfFiles: number = 0;
  picFiles: any[] = [];
  categories:CategoryDtoResponse[]=[];
  tags:TagDtoRequest[]=[];
  productDtoRequest : ProductDtoRequest ={
    id: '',
    name: '',
    quantity: 0,
    weight: 0,
    purchasePrice: 0,
    finalPrice: '',
    categoryId: '',
    description: '',
    tags: [],
    benefits: '',
    howToUse: ''
  }
  productMedias:ProductMediaDtoRequest[]=[]

  ngOnInit()
  {
    this.categoryService.getSomeData()
    .subscribe(res => {
      this.categories = res
    })
    this.tagService.getSomeData()
    .subscribe(res => {
      this.tags = res
    })
  }

  postData() {
    this.uploadService.postData(this.picFiles).pipe(
      switchMap((res: any[]) => {
        // Ajouter les liens d'image au DTO du produit
        res.forEach((mediaLink: any) => {
          this.productMedias.push({
            mediaName: mediaLink,
            id: '',
            productId: ''
          });
        });
        // Retourner la requête de création de produit pour exécution après l'upload
        return this.productService.postData(this.productDtoRequest);
      })
    ).subscribe(
      (res) => {
        this.productMedias.map(media => media.productId = res.id)
        this.productMediaService.postAllData(this.productMedias).subscribe(
          ()=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Created!' });
          this.router.navigate(['/dashboard/products']);
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problem in creating product!' });
          Swal.fire({
            title: "Problem in creating product!",
            icon: "error"
          });
        }
          
      )
      },
      error => {
        Swal.fire({
          title: "Problem in creating product!",
          icon: "error"
        });
      }
    );
  }

  addTag(tagId: String): void {
    // Add tag if it doesn't exist already
    if (!this.productDtoRequest.tags.includes(tagId)) {
      this.productDtoRequest.tags.push(tagId);
    }
  }
  
  removeTag(tagId: String): void {
    // Remove the tag if it exists in the array
    this.productDtoRequest.tags = this.productDtoRequest.tags.filter(id => id !== tagId);
  }

  tagExists(tagId: String): boolean {
    return this.productDtoRequest.tags.includes(tagId);
  }
  
  

  // postData()
  // {
  //   this.uploadService.postData(this.picFiles)
  //   .subscribe(
  //     res => {
  //       (res as any[]).forEach((mediaLink: any) => {
  //         this.productDtoRequest.productMedias.push({
  //           mediaName: mediaLink ,
  //           id:'',
  //           productId:''
  //         });
  //       });
  //     }
  //   )
  //   this.productService.postData(this.productDtoRequest).subscribe(
  //     res => {
  //     Swal.fire({
  //       title: "Product Created!",
  //       icon: "success"
  //     });
  //     this.router.navigate(['/dashboard/products']);
  //   },
  //   error => {
  //     Swal.fire({
  //       title: "problem in create product !",
  //       icon: "error"
  //     });
  //   }
  // )
  // }


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
