import { Router } from "express";

import { createPost, getAllPosts, getPost, deletePost } from "../controllers/post.controller";

const router: Router = Router();

router.get("/", getAllPosts);
router.get("/detail/:id", getPost);
router.post("/create/:username", createPost);
router.delete("/:id", deletePost);

export default router;
