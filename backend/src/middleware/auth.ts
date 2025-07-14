import zod, {string} from "zod"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

const client = new PrismaClient
const JWT_SECRET=process.env.JWT_SECRET

const User = zod.object({
    name:string(),
    email:string(),
    password:string().min(8)
})
const Signin = zod.object({
    email:string(),
    password:string().min(8)
})

type userType = zod.infer<typeof User>
type signinType = zod.infer<typeof Signin>

async function signup(req:Request<{}, {}, userType>, res:Response){
    const user = User.safeParse(req.body)
    if(!user.success){
        return res.status(400).json({message:"invalid input"})
    }

    try{
        const hashPassword = await  bcrypt.hash(user.data.password, 10)
        await client.user.create({
            data:{
                name: user.data.name,
                email: user.data.email,
                password: hashPassword
            }
        })
        res.status(201).json({message:"User created"})

    }catch(e){
        res.status(500).json({message:"couldn't create user, try again."})
    }

}

async function signin(req:Request<{}, {}, signinType>, res:Response){
    const user = Signin.safeParse(req.body)
    if(!user.success){
        return res.status(401).json({message:"invalid input"})
    }
    const isExisting = await client.user.findFirst({
        where:{
            email:user.data.email
        }
    })
    if(!isExisting){
        return res.status(403).json({message:"user doesn't exist"})
    }

    const checkPassword = await bcrypt.compare(user.data.password, isExisting.password)

    if(checkPassword){
        if (!JWT_SECRET) {
            return res.status(500).json({message: "Internal server error"});
        }
        const token = jwt.sign({ userId: isExisting.id }, JWT_SECRET);
        res.cookie('authToken', token, {httpOnly:true})
        res.json({message:"Logged in."})
    }
}

async function authUser(req:Request, res:Response, next:NextFunction){
    const authToken = req.cookies['authToken']
    if(!authToken){
        return res.status(401).json({ error: "No token provided" });
    }
    if (!JWT_SECRET) {
        return res.status(500).json({message:"Internal Error"});
    }
    try{
        const decoded = jwt.verify(authToken, JWT_SECRET) as jwt.JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

async function logout(req:Request,res:Response){
    res.clearCookie('token')
    res.cookie('token', '')
    res.json({message:"Logged out."})
}

export{
    signin, 
    signup, 
    logout,
    authUser
}
