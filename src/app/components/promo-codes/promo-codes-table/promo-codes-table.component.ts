import { Component, Input } from '@angular/core';
import { PromoCodeModel } from 'src/app/core/models/promo-code.model';
import { PromoCodeDtoRequest } from 'src/app/core/models/PromoCodeDtoRequest.model';
import { PromoCodeService } from 'src/app/core/services/promo-code.service';

@Component({
  selector: 'app-promo-codes-table',
  templateUrl: './promo-codes-table.component.html',
  styleUrls: ['./promo-codes-table.component.css']
})
export class PromoCodesTableComponent {
  @Input() influencerId: string='';
  promoCodes: PromoCodeDtoRequest[] = [];
  constructor(private promoCodeService:PromoCodeService){}
  ngOnInit(): void {
    console.log(this.influencerId);
    if(this.influencerId != ''){
    this.loadPromoCodesForInfluencer(this.influencerId);
    }
  }

loadPromoCodesForInfluencer(influencerId: string) {
  this.promoCodeService.getByInfluencerId(influencerId).subscribe({
    next: (data) => this.promoCodes = data,
    error: (err) => console.error('Failed to load promo codes', err)
  });
}

}
