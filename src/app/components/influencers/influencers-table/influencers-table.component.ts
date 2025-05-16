import { Component, OnInit, ViewChild } from '@angular/core';
import { InfluencerModel } from '../../../core/models/influencer.model';
import { InfluencerService } from '../../../core/services/influencer.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InfluencerFormComponent } from '../influencer-form/influencer-form.component';

@Component({
    selector: 'app-influencers-table',
    templateUrl: './influencers-table.component.html',
    styleUrls: ['./influencers-table.component.scss']
})
export class InfluencersTableComponent implements OnInit {
    @ViewChild(InfluencerFormComponent) influencerForm!: InfluencerFormComponent;
    
    influencers: InfluencerModel[] = [];
    currentPage = 1;
    totalPages = 1;
    pageSize = 10;

    constructor(
        private influencerService: InfluencerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadInfluencers();
    }

    loadInfluencers(): void {
        this.influencerService.getAll().subscribe({
            next: (data: InfluencerModel[]) => {
                this.influencers = data;
                this.totalPages = Math.ceil(data.length / this.pageSize);
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load influencers'
                });
            }
        });
    }

    showNewDialog(): void {
        this.influencerForm.showDialog();
    }

    editInfluencer(influencer: InfluencerModel): void {
        this.influencerForm.showDialog(influencer);
    }

    confirmDelete(id: string, event: Event): void {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to delete this influencer?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteInfluencer(id);
            }
        });
    }

    deleteInfluencer(id: string): void {
        this.influencerService.delete(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Influencer deleted successfully'
                });
                this.loadInfluencers();
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete influencer'
                });
            }
        });
    }

    toggleStatus(id: string): void {
        this.influencerService.toggleStatus(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Influencer status updated successfully'
                });
                this.loadInfluencers();
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update influencer status'
                });
            }
        });
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
} 