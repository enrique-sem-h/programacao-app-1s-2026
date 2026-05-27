import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  // verify token presence
  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  if (!secret) {
    return res.status(500).json({ error: "Internal err: no secret provided" });
  }

  // verify token validity
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("error verifying token:", error);
    return res.status(403).json({ message: "token failed to be verified!" });
  }
};
