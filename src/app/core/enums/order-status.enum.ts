export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    RETURNED = 'RETURNED',
    REFUNDED = 'REFUNDED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    REFUSED_BY_CLIENT = 'REFUSED_BY_CLIENT',
    REFUSED_BY_SELLER = 'REFUSED_BY_SELLER'
}

export const OrderStatusColors: Record<OrderStatus, { bg: string; text: string }> = {
    [OrderStatus.PENDING]: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    [OrderStatus.CONFIRMED]: { bg: 'bg-blue-100', text: 'text-blue-600' },
    [OrderStatus.PROCESSING]: { bg: 'bg-purple-100', text: 'text-purple-600' },
    [OrderStatus.SHIPPED]: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    [OrderStatus.OUT_FOR_DELIVERY]: { bg: 'bg-orange-100', text: 'text-orange-600' },
    [OrderStatus.DELIVERED]: { bg: 'bg-green-100', text: 'text-green-600' },
    [OrderStatus.CANCELLED]: { bg: 'bg-red-100', text: 'text-red-600' },
    [OrderStatus.RETURNED]: { bg: 'bg-gray-200', text: 'text-gray-600' },
    [OrderStatus.REFUNDED]: { bg: 'bg-teal-100', text: 'text-teal-600' },
    [OrderStatus.PAYMENT_FAILED]: { bg: 'bg-red-200', text: 'text-red-700' },
    [OrderStatus.REFUSED_BY_CLIENT]: { bg: 'bg-rose-100', text: 'text-rose-600' },
    [OrderStatus.REFUSED_BY_SELLER]: { bg: 'bg-pink-100', text: 'text-pink-600' },
};