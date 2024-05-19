import bcrypt from "bcryptjs";

import { db } from "./db";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const matchPasswords = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return await bcrypt.compare(password, user?.password as string);
};
