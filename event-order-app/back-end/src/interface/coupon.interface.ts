export interface ICoupon {
  code: string;
  discount_amount: number;
  max_usage: number;
  is_active: boolean;
  created_by_id: number;
  created_at?: Date;
}
