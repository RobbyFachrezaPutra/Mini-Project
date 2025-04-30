import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";

import { PORT, FE_URL } from "./config";

import AuthRouter from "./routers/auth.router";
import CouponRouter from "./routers/coupon.router";
import eventCategoryRouter from "./routers/event-category.router";
import eventRouter from "./routers/event.router";
import ticketRouter from "./routers/ticket.router";

const port = PORT || 8000;
const app: Application = express();

app.use(
  cors({
    origin: FE_URL,
    credentials: true,
  })
);

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

app.use("/api/eventorder/auth", AuthRouter);
app.use("/api/eventorder/coupon", CouponRouter);
app.use("/api/eventorder/event-categories", eventCategoryRouter);
app.use("/api/eventorder/events", eventRouter);
app.use("/api/eventorder/tickets", ticketRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
