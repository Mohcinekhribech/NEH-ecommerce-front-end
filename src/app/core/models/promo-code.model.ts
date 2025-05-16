import { InfluencerModel } from './influencer.model';

export interface PromoCodeModel {
    id: string;
    code: string;
    influencerId: string;
    influencer?: InfluencerModel;
    discountPercentage: number;
    validFrom: Date;
    validUntil: Date;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
} 