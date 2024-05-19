import { Request, Response } from "express";

import { db } from "../utils/db";

import { hashPassword, matchPasswords } from "../utils/auth";
import { getSignedToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword: string = await hashPassword(password);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("REGISTER_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatchPassword = await matchPasswords(user.email, password);

    if (!isMatchPassword) {
      return res.json(400).json({ message: "Wrong credentials!" });
    }

    const token = getSignedToken(user.id);
    const expiryDate = new Date(Date.now() + 3600000);

    const { password: hashedPassword, ...rest } = user;

    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    if (error instanceof Error) {
      console.log("LOGIN_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.clearCookie("access_token").status(200).json("Logout success!");
};
