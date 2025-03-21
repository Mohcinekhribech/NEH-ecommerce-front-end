import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagDtoRequest } from 'src/app/core/models/TagDtoRequest.model';
import { TagDtoResponse } from 'src/app/core/models/TagDtoResponse.model';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: ['./tags-table.component.css']
})
export class TagsTableComponent {
  constructor(private tagService: TagService,private messageService: MessageService, private confirmationService: ConfirmationService) {}
  tags: TagDtoResponse[] = [];
  showUpdateForm: boolean = false;
  selectedTag: TagDtoRequest = {
    name: '',
    id: ''
  };

  ngOnInit() {
    this.tagService.getSomeData()
      .subscribe(res => {
        this.tags = res;
      });
  }

  closeModal(data: any) {
    this.showUpdateForm = false;
    this.selectedTag = {
      id: '',
      name: ''
    };
  }

  updateTag(tag: TagDtoRequest) {
    this.selectedTag = tag;
    this.showUpdateForm = true;
  }

  deleteItem(id: String): void {
    this.tags = this.tags.filter(item => item.id !== id);
  }

  deleteTag(id: String,event:Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: ' Yes ',
      rejectLabel: ' No ',
      acceptButtonStyleClass: 'bg-[#8DB600] text-white px-2',
      rejectButtonStyleClass: 'mr-2.5 bg-grat-200 border px-2',
      accept: () => {
        this.tagService.deleteData(id).subscribe(
          res => {
            this.deleteItem(id)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'the tag deleted', life: 3000 });
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'You have cancel the deletion', life: 3000 });
      }
    });
  }
}
