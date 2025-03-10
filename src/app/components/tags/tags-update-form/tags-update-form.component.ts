import { Component, Input } from '@angular/core';
import { TagDtoRequest } from 'src/app/core/models/TagDtoRequest.model';
import { TagService } from 'src/app/core/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags-update-form',
  templateUrl: './tags-update-form.component.html',
  styleUrls: ['./tags-update-form.component.css']
})
export class TagsUpdateFormComponent {
  constructor(private tagService:TagService){}
  @Input() tagDtoRequest : TagDtoRequest ={
    id:'',
    name: '',
  }

  putData()
  {
    this.tagService.putData(this.tagDtoRequest,this.tagDtoRequest.id).subscribe(
      res => {
      Swal.fire({
        title: "Tag Updated!",
        icon: "success"
      });
    },
    error => {
      Swal.fire({
        title: "problem in update tag !",
        icon: "error"
      });
    }
  )
  }
}
