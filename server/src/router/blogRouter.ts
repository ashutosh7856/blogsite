import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllBlogs, getBlogById } from "../controller/blogController.js";


const router = Router()

router.get('/blogs', authMiddleware, getAllBlogs)
router.get('/blog/:id', authMiddleware, getBlogById)



export default router