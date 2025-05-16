import { Component, ViewChild } from '@angular/core';
import { InfluencersTableComponent } from 'src/app/components/influencers/influencers-table/influencers-table.component';

@Component({
    selector: 'app-influencers-page',
    templateUrl: './influencers-page.component.html'
})
export class InfluencersPageComponent {
  showAddForm:boolean = false;
  @ViewChild(InfluencersTableComponent) influencersTableComponent : InfluencersTableComponent | undefined;
  closeModal(data: any) {
    this.showAddForm = false;
  }
  ngOnInit()
  {
    this.influencersTableComponent?.ngOnInit();
  }
} 