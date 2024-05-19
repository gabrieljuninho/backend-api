import { Request, Response } from "express";

import { db } from "../utils/db";

export const createComment = async (req: Request, res: Response) => {
  const { comment } = req.body;
  const { userId, id } = req.params;

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const comments = await db.comment.create({
      data: {
        userId: user?.id as string,
        postId: id,
        comment: comment,
      },
    });

    return res.status(201).json({ comments, message: "Post created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("CREATE_COMMENT_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await db.user.findMany({
      where: {
        comment: {
          some: {
            postId: id,
          },
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
        comment: {
          select: {
            comment: true,
          },
        },
      },
    });

    return res.status(201).json({ user, message: "Post created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("CREATE_COMMENT_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};
