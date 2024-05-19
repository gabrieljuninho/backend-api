import { Request, Response } from "express";
import { Post } from "@prisma/client";

import { db } from "../utils/db";

export const createPost = async (req: Request, res: Response) => {
  const { image, title, description } = req.body;
  const { username } = req.params;

  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    const post: Post = await db.post.create({
      data: {
        userId: user?.id as string,
        username: user?.username as string,
        profileImage: user?.image as string,
        image,
        title,
        description,
      },
    });

    return res.status(201).json({ post, message: "Post created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("CREATE_POST_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      console.log("GET_POST_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.post.findMany();

    return res.status(201).json({ posts, message: "Post created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("GET_ALL_POST_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await db.post.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      console.log("GET_POST_CONTROLLER: ", error.message);

      return res.status(500).json({ message: error.message });
    }
  }
};
