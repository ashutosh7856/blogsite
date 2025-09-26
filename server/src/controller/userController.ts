import { blogSchema, signInSchema, signUpSchema, updateUserSchema } from "../schemas/userSchema.js";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const client = new PrismaClient()

export async function signUp(req:Request, res:Response){
    const validation = signUpSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({
            message:"Incorrect  Input",
            errors:validation.error.issues
        })
    }

    const signUpData = validation.data



    try {
        const isUser = await client.users.findFirst({
            where:{
                email:signUpData.email
            }
        })

        if(isUser){
            return res.status(409).json({
                message:"user already exist."
            })
        }
        const hashedPassword = await bcrypt.hash(signUpData.password, 10)

        const user = await client.users.create({
            data:{...signUpData, password:hashedPassword}
        })
        const token = jwt.sign({id:user.id, email:user.email}, 'none')

        const profile = await client.profile.create({
            data:{
                userId:user.id,
                bio:'random bio change it'
            }
        })
        return res.status(200).json({
            message:'User created successfully.',
            token:token
        })
    }catch(err){
        console.error(err)
        return res.json({
            message:"Internal server error"
        })
    }
}

export async function signIn(req:Request, res:Response){
    const validation = signInSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({
            message:'Incorrect input'
        })
    }

    try{
        const User = await client.users.findFirst({
            where:{
                email:validation.data.email
            }
        })
        if(!User){
            return res.status(404).json({
                message:'No user found with this email.'
            })
        }
        const verified = await bcrypt.compare(validation.data.password, User.password)
        if(!verified){
            return res.status(401).json({
                message:'wrong password'
            })
        }
        const token = jwt.sign({id:User.id, email:User.email}, "none")

        return res.status(200).json({
            message:'signed in successfully',
            token:token
        })
    }catch(err){
        console.error(err)
        res.json({
            message:'Internal server error'
        })
    }

}



export async function getUser(req:Request, res:Response){
    try{

        const [profile, user] = await Promise.all([
            await client.profile.findFirst({where:{userId:req.userId}, select:{id:true, bio:true}}),
            await client.users.findFirst({where:{id:req.userId}, select:{name:true, email:true}})
        ])

        if(!user){
            return res.status(404).json({
                message:"No User Found",
            })
        }

        return res.status(200).json({
            message:"Found",
            profile:{...profile, ...user}
        })
    }catch{
        // ignore
    }
}


export async function getMyBlogs(req:Request, res:Response){
    try{
        const blogs = await  client.blogs.findMany({
            where:{
                userId:req.userId
            },

        })

        if(blogs.length < 1){
            return res.json({
                message:"No blogs found"
            })
        }

        return res.json({
            message:'blogs found',
            blogs:blogs
        })
    }catch{
        // ignore
    }
}

export async function updateUser(req:Request, res:Response){
    const validation = updateUserSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(411).json({
            message:'incorrect input fields'
        })
    }

    const updateData = validation.data

    if(updateData.password){
        try{
           const user = await client.users.findFirst({
            where:{
                id:req.userId
            }
           }) 

           if(!user){
            return res.status(401).json({
                message:'wrong password'
            })
           }

           const verified = await bcrypt.compare(updateData.password, user.password)

           if(!verified){
            return res.status(401).json({
                message:"incorrect  password"
            })
           }

           const newPassword = await bcrypt.hash(updateData.newPassword as string, 10)
           await client.users.update({
            where:{
                id:req.userId
            },
            data:{
                password:newPassword
            }
           })

           return res.json({
            message:"password updated successfully."
           })
        }catch{
            // 
        }
    }
    if(updateData.bio){
        try{
            await client.profile.update({
                where:{
                    userId:req.userId
                },
                data:{
                    bio:updateData.bio
                }
            })

            res.json({
                message:"bio updated succesfully."
            })
        }catch{
            // 
        }
    }

   const updatedUser =  await client.users.update({
        where:{
            id:req.userId
        },
        data:{
            email:updateData.email as string,
            name:updateData.name as string

        }
    })

    res.json({
        message:'user updated successfully',
        updateUser:updateUser
    })


}



export async function createBlog(req:Request, res:Response){
    const validation = blogSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(401).json({
            message:'incorrect input'
        })
    }

    const blogData = validation.data

    try{
        const blog = await client.blogs.create({
            data:{
                title: blogData.title,
                body: blogData.body as string,
                userId:req.userId
            }
        })
         return res.json({
            message:'blog created.',
            blog:blog
         })
    }catch{
        // 
    }
}


