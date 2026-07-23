import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/auth.types";

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const decoded = verifyToken(token) as TokenPayload;

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};