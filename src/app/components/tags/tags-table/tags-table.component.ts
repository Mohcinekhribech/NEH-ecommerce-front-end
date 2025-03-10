import { Component } from '@angular/core';
import { TagDtoRequest } from 'src/app/core/models/TagDtoRequest.model';
import { TagDtoResponse } from 'src/app/core/models/TagDtoResponse.model';
import { TagService } from 'src/app/core/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: ['./tags-table.component.css']
})
export class TagsTableComponent {
  constructor(private tagService:TagService){}
  tags : TagDtoResponse[] = []
  showUpdateForm:boolean = false;
  selectedTag:TagDtoRequest ={
    name: '',
    id: ''
  }

  ngOnInit()
  {
    this.tagService.getSomeData()
    .subscribe(res => {
      this.tags = res
    })
  }

  closeModal(data: any) {
    this.showUpdateForm = false;
    this.selectedTag = {
      id : '',
      name : ''
    }
  }

  updateTag(tag : TagDtoRequest)
  {
    this.selectedTag = tag 
    this.showUpdateForm = true
  }
  deleteItem(id: String): void {
    this.tags = this.tags.filter(item => item.id !== id);
  }

  deleteTag(id:String)
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
        this.tagService.deleteData(id).subscribe(
          res => {
            this.deleteItem(id)
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
