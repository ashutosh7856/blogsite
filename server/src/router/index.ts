import { Router } from "express";
import userRouter from "./userRouter.js"
import blogRouter from "./blogRouter.js"

const router = Router()

router.use('/user', userRouter)
router.use('/blog', blogRouter)

export default router