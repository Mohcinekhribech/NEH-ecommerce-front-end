import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommissionDtoResponse } from 'src/app/core/models/CommissionDtoResponse.model';
import { CommissionService } from 'src/app/core/services/commission.service';

@Component({
  selector: 'app-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent {
  @Input() influencerId: string='';
  commissions: CommissionDtoResponse[] = [];
  totalCommission: number = 0;
  unpaidCommission: number = 0;

  constructor(private commissionService: CommissionService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadCommissions();
  }

  markAllCommissionsAsPaid(): void {
    this.commissionService.markAllAsPaidByInfluencerId(this.influencerId).subscribe({
      next: (updatedCommissions) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${updatedCommissions.length} commissions marked as paid`
        });
        this.loadCommissions(); // refresh the list
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark commissions as paid'
        });
      }
    });
  }
  

  loadCommissions(): void {
    this.commissionService.getByInfluencerId(this.influencerId).subscribe({
      next: (data) => {
        this.commissions = data;
      },
      error: (error) => {
        console.error('Error fetching commissions:', error);
      }
    });
    this.commissionService.getCommissionSummary(this.influencerId).subscribe({
      next: summary => {
        this.totalCommission = summary.totalCommission;
        this.unpaidCommission = summary.unpaidCommission;
      },
      error: err => console.error('Error loading commission summary:', err)
    });
  }

  markCommissionAsPaid(commissionId: string): void {
    this.commissionService.markAsPaid(commissionId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Commission marked as paid'
        });
        this.loadCommissions();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark commission as paid'
        });
      }
    });
  }
  
}
