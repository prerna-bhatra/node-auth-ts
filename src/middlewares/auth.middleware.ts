// src/middleware/auth.middleware.ts
import { log } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract the token from the request headers'
    // req ={
    //     body:{

    //     },
    //     headers:{
    //         authorization:"bearer abcd..."
    //     }
    // }
    const tokenWithBearer = req.headers.authorization;

    //tokenWithBearer ="bearer abcd..."

    console.log("tokenWithBearer", tokenWithBearer);

    if (!tokenWithBearer) {
      res
        .status(401)
        .json({ message: "Authentication failed: No token provided" });
      return;
    }

    const tokenArr = tokenWithBearer?.split(" ");
    //tokenArr = ["bearer","abcd..."]

    const token = tokenArr[1];

    // token = "abcd..."

    if (!token) {
      res
        .status(401)
        .json({ message: "Authentication failed: No token provided" });
      return;
    }

    // Verify the token
    jwt.verify(token, "secret@123", (err: any, decoded: any) => {
      console.log("decoded", decoded);

      if (err) {
        res
          .status(401)
          .json({ message: "Authentication failed: Invalid token" });
        return;
      }

      // Attach the decoded user information to the request for future use
      req["user"] = decoded;

      console.log({ user: req["user"] });

      next();
    });
  } catch (error) {
    throw error;
  }
};
