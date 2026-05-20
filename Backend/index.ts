import express from "express";
import * as routers from "./src/routers/exports.ts";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", async (req: any, res: any) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/", routers.authRouter);
app.use("/", routers.userRouter);
app.use("/", routers.anuncioRouter);

app.listen(PORT, () => {
  console.log(`server initiated at http://localhost:${PORT}`);
});
