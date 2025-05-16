export interface InfluencerModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    commissionRate: number;
    isActive: boolean;
    totalCommission: number;
    unpaidCommission: number;
    createdAt: Date;
    updatedAt: Date;
} 