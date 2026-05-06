import express from "express";
import * as routers from "./routers/exports.ts";

const app = express();

const PORT = 3000;

app.get("/", routers.authRouter);

app.listen(PORT, () => {
  console.log(`server initiated at http://localhost:${PORT}`);
});
