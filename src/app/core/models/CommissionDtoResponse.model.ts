export interface CommissionDtoResponse {
    id: string;
    amount: number;
    isPaid: boolean;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  