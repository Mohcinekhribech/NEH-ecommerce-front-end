export interface PromoCodeDtoRequest {
    id?: string;
  code: string;
  influencerId: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  maxUses: number;
  isActive?: boolean;
  }
  