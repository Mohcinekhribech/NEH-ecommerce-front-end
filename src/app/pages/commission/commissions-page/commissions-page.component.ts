import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commissions-page',
  templateUrl: './commissions-page.component.html',
  styleUrls: ['./commissions-page.component.css']
})
export class CommissionsPageComponent {
  influencerId: string='';

  constructor(private route: ActivatedRoute) {}

  ngOnInit()
  {
    this.influencerId = this.route.snapshot.paramMap.get('id') || '';
  }
}
