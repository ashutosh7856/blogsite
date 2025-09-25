import type { NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message:'unauthrozied access.'
        })
    }

    const token = authHeader.split(' ')[1]

    const verified = jwt.verify(token as string, "none")

    if(!verified){
        return res.status(401).json({
            message:'wrong jwt found'
        })
    }

    if((verified as any).id){

        req.userId = (verified as any).id

        next()
    }else{
        return res.status(401).json({
            message:"couldn't verify token"
        })
    }

}