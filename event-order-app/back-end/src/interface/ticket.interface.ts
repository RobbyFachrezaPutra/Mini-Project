export interface ITicketParam {
  name        : string;
  event_id    : number;
  type        : string;
  price       : number;
  quota       : number;
  remaining   : number;
  sales_start : Date;
  sales_end   : Date;
  created_at  : Date;
  updated_at  : Date;
  created_by_id : number;
}