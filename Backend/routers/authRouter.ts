import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!" });
});

export default router;
