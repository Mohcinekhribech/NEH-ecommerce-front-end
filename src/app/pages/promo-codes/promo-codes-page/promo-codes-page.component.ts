import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromoCodesTableComponent } from 'src/app/components/promo-codes/promo-codes-table/promo-codes-table.component';

@Component({
  selector: 'app-promo-codes-page',
  templateUrl: './promo-codes-page.component.html',
  styleUrls: ['./promo-codes-page.component.css']
})
export class PromoCodesPageComponent {
  showAddForm:boolean = false;
  influencerId :string = '';
  @ViewChild(PromoCodesTableComponent) promoCodesTableComponent : PromoCodesTableComponent | undefined;
  constructor(private route: ActivatedRoute) {}
  closeModal(data: any) {
    this.showAddForm = false;
  }
  ngOnInit()
  {
    this.influencerId = this.route.snapshot.paramMap.get('id') || '';
    this.promoCodesTableComponent?.ngOnInit();
  }

}
