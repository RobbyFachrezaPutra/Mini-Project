export interface IVoucherParam {
  event_id        : number;
  code            : string;
  description     : string;
  discount_amount : number;
  sales_start     : Date;
  sales_end       : Date;
  created_at      : Date;
  updated_at      : Date;
  created_by_id   : number;
}