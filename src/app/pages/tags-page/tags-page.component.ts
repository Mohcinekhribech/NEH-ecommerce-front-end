import { Component, ViewChild } from '@angular/core';
import { TagsTableComponent } from 'src/app/components/tags/tags-table/tags-table.component';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.css']
})
export class TagsPageComponent {
  showAddForm:boolean = false;
  @ViewChild(TagsTableComponent) tagsTableComponent : TagsTableComponent | undefined;
  closeModal(data: any) {
    this.showAddForm = false;
  }
  ngOnInit()
  {
    this.tagsTableComponent?.ngOnInit();
  }
}
