import express, { Application } from "express";

import { PORT } from "./config";

const port = PORT || 8000;
const app: Application = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
