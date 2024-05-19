import { Response } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const getSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};

export const generateToken = (user: User, statusCode: number, res: Response) => {
  const token = getSignedToken(user.id);

  return res.status(statusCode).json({
    success: true,
    token,
  });
};
