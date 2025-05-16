import { InfluencerModel } from './influencer.model';

export interface CommissionModel {
    id: string;
    influencerId: string;
    influencer?: InfluencerModel;
    orderId: string;
    amount: number;
    isPaid: boolean;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
} 