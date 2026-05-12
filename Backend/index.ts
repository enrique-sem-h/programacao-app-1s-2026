import express from "express";
import * as routers from "./src/routers/exports.ts";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", routers.authRouter);
app.use("/", routers.userRouter);

app.listen(PORT, () => {
  console.log(`server initiated at http://localhost:${PORT}`);
});
