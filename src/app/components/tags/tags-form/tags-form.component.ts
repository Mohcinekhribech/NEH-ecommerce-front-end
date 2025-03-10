import { Component, EventEmitter, Output } from '@angular/core';
import { TagDtoRequest } from 'src/app/core/models/TagDtoRequest.model';
import { TagService } from 'src/app/core/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.css']
})
export class TagsFormComponent {
  @Output() notifyParent = new EventEmitter<void>();
  constructor(private tagService:TagService){}
  tagDtoRequest : TagDtoRequest ={
    name: '',
    id: ''
  }

  postData()
  {
    this.tagService.postData(this.tagDtoRequest).subscribe(
      res => {
        this.notifyParent.emit()
      Swal.fire({
        title: "Tag Created!",
        icon: "success"
      });
    },
    error => {
      Swal.fire({
        title: "problem in create tag !",
        icon: "error"
      });
    }
  )
  }
}
