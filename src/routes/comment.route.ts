import { Router } from "express";

import { createComment, getAllComments } from "../controllers/comment.controller";

const router: Router = Router();

router.post("/:userId/:id", createComment);
router.get("/:id", getAllComments);

export default router;
