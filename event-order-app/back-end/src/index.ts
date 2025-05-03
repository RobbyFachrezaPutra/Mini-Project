import express, { Application, Request, Response, NextFunction } from "express";

import { PORT } from "./config";

import AuthRouter from "./routers/auth.router";
import CouponRouter from "./routers/coupon.router";
import eventCategoryRouter from "./routers/event-category.router";
import eventRouter from "./routers/event.router";
import ticketRouter from "./routers/ticket.router";
import voucherRouter from "./routers/voucher.router";
import transactionRouter from "./routers/transaction.router";

const port = PORT || 8001;
const app: Application = express();
const base_url : string = "/api/eventorder";

app.use(express.json());
app.get(
  "/api",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("test masuk");
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("ini api");
  }
);

app.use(`${base_url}/auth`, AuthRouter);
app.use(`${base_url}/coupons`, CouponRouter);
app.use(`${base_url}/event-categories`, eventCategoryRouter);
app.use(`${base_url}/events`, eventRouter);
app.use(`${base_url}/tickets`, ticketRouter);
app.use(`${base_url}/vouchers`, voucherRouter);
app.use(`${base_url}/transactions`, transactionRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
