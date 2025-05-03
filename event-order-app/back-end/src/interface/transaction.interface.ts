export interface ITransactionParam {
    user_id         : number;
    event_id        : number;
    ticket_id       : number;
    voucher_id      : number;
    coupon_id       : number;
    voucher_amount  : number;
    point_amount    : number;
    coupon_amount   : number;
    final_price     : number;
    qty             : number;
    price           : number;
    total_price     : number;
    status          : string;
    payment_proof   : string;
}