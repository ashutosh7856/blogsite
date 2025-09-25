import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const client = new PrismaClient()

export async function getAllBlogs(req:Request, res:Response){
    try{
        const blogs = await client.blogs.findMany({take : 10})

        if(!blogs){
            return res.json({
                message:'No blogs found'
            })
        }

        return res.json({
            message:'blogs found.',
            blogs:blogs
        })
    }catch{
        // 
    }
}


export async function getBlogById(req:Request, res:Response){
    const blogid = req.params.id
    if(!blogid){
        return res.status(411).json({
            message:'blog id not found'
        })
    }

    try {
        const blog = await client.blogs.findFirst({
            where:{
                id:blogid
            }
        })

        if(!blog){
            return res.json({
                message:"can't find the blog"
            })
        }

        return res.json({
            message:"blogs found by id",
            blog:blog
        })
    }catch{
        // 
    }
}
