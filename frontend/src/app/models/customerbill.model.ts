export interface CustomerBill {
  customerId?: number;
  customerName: string;
  totalAmount?: number;
  startedAt: string;
  createdAt?: string;
  exitedAt?: string;
    billItems: {
        menuId?: number;
        quantity: number;
        menuName: string;
        price: number;
    }[];
}