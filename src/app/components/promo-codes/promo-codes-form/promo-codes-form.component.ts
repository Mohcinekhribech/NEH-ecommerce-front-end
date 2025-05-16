import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PromoCodeModel } from 'src/app/core/models/promo-code.model';
import { PromoCodeDtoRequest } from 'src/app/core/models/PromoCodeDtoRequest.model';
import { PromoCodeService } from 'src/app/core/services/promo-code.service';

@Component({
  selector: 'app-promo-codes-form',
  templateUrl: './promo-codes-form.component.html',
  styleUrls: ['./promo-codes-form.component.css'],
  providers: [MessageService]
})
export class PromoCodesFormComponent implements OnInit {
  @Input() influencerId!: string; // Influencer ID must be passed to the form
  @Input() selectedPromoCode?: PromoCodeModel; // For edit
  @Output() formClosed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  promoCodeForm =  this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    discountPercentage: [0 as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
    validFrom: [null as Date | null, Validators.required],
    validUntil: [null as Date | null, Validators.required],
    maxUses: [1 as number | null, [Validators.required, Validators.min(1)]],
    isActive: [true as boolean | null],
  });

  submitted = false;
  isNew = true;

  constructor(
    private fb: FormBuilder,
    private promoCodeService: PromoCodeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.selectedPromoCode) {
      this.isNew = false;
      this.promoCodeForm.patchValue(this.selectedPromoCode);
    }
  }

  get f() {
    return this.promoCodeForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.promoCodeForm.invalid || !this.influencerId) {
      return;
    }

    const formValue = this.promoCodeForm.value;
    const payload: PromoCodeDtoRequest = {
      code: formValue.code ?? '',
      discountPercentage: formValue.discountPercentage ?? 0,
      validFrom: formValue.validFrom ?? new Date(),
      validUntil: formValue.validUntil ?? new Date(),
      maxUses: formValue.maxUses ?? 1,
      isActive: formValue.isActive ?? true,
      influencerId: this.influencerId,
      id: this.selectedPromoCode?.id
    };

    if (this.isNew) {
      this.promoCodeService.create(payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Promo code created.' });
          this.saved.emit();
          this.closeForm();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation failed.' });
        }
      });
    } else {
      this.promoCodeService.update(payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Promo code updated.' });
          this.saved.emit();
          this.closeForm();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed.' });
        }
      });
    }
  }

  closeForm(): void {
    this.promoCodeForm.reset({ isActive: true, maxUses: 1 });
    this.submitted = false;
    this.formClosed.emit();
  }

  hideDialog(): void {
    this.closeForm();
  }
}
