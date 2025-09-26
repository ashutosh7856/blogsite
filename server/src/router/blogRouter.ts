import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllBlogs, getBlogById } from "../controller/blogController.js";


const router = Router()

router.get('/all', getAllBlogs)
router.get('/:id', authMiddleware, getBlogById)



export default router