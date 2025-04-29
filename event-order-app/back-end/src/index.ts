import express, { Application, Request, Response, NextFunction } from "express";

import { PORT } from "./config";

import AuthRouter from "./routers/auth.router";
import CouponRouter from "./routers/coupon.router";
import eventCategoryRouter from "./routers/event-category.router";
import eventRouter from "./routers/event.router";
import ticketRouter from "./routers/ticket.router";
import voucherRouter from "./routers/voucher.router";

const port = PORT || 8000;
const app: Application = express();
const base_uri : string = "/api/eventorder";

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

app.use(`${base_uri}/auth`, AuthRouter);
app.use(`${base_uri}/coupon`, CouponRouter);
app.use(`${base_uri}/event-categories`, eventCategoryRouter);
app.use(`${base_uri}/events`, eventRouter);
app.use(`${base_uri}/tickets`, ticketRouter);
app.use(`${base_uri}/vouchers`, voucherRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
