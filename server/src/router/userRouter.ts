import { Router } from "express";
import { getMyBlogs, getUser, signIn, signUp, updateUser } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router()


router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/myblogs', authMiddleware, getMyBlogs)
router.get('/my-profile', authMiddleware, getUser)
router.patch('/update-profile', authMiddleware, updateUser)



export default router