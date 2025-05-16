import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InfluencerModel } from '../../../core/models/influencer.model';
import { InfluencerService } from '../../../core/services/influencer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-influencer-form',
    templateUrl: './influencer-form.component.html',
    styleUrls: ['./influencer-form.component.scss'],
    providers: [MessageService]
})
export class InfluencerFormComponent implements OnInit {
    displayDialog = false;
    isNew = true;
    influencerForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private influencerService: InfluencerService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.influencerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            commissionRate: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
            isActive: [true]
        });
    }

    ngOnInit(): void {}

    get f() { return this.influencerForm.controls; }

    showDialog(influencer?: InfluencerModel): void {
        this.isNew = !influencer;
        if (influencer) {
            this.influencerForm.patchValue(influencer);
        } else {
            this.influencerForm.reset({
                commissionRate: 0,
                isActive: true
            });
        }
        this.displayDialog = true;
        this.submitted = false;
    }

    hideDialog(): void {
        this.displayDialog = false;
        this.submitted = false;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.influencerForm.invalid) {
            return;
        }

        this.loading = true;
        const influencerData = this.influencerForm.value;

        if (this.isNew) {
            this.influencerService.create(influencerData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Influencer created successfully'
                    });
                    this.hideDialog();
                    this.loading = false;
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create influencer'
                    });
                    this.loading = false;
                }
            });
        } else {
            this.influencerService.update(influencerData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Influencer updated successfully'
                    });
                    this.hideDialog();
                    this.loading = false;
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update influencer'
                    });
                    this.loading = false;
                }
            });
        }
    }
} 