export const ORDER_STATUSES = ["PENDING", "CANCELED", "DELIVERED"] as const;

export type FoodOrderStatus = (typeof ORDER_STATUSES)[number];
