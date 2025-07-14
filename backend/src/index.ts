import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"
import {nanoid} from "nanoid";
import cookieParser from "cookie-parser";
import { logout, signin, signup, authUser } from "./middleware/auth";
const prisma = new PrismaClient()
const PORT = 3000
const app = express()


app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173/'
}))
app.use(cookieParser())


app.post('/signup', signup)
app.post('/signin', signin)
app.post('/logout', logout)
app.post('/content',authUser, async(req, res)=>{
    const userId = req.userId 
    const content = req.body
    if(!userId){
        return res.status(403)
    }
   try{
     await prisma.blogs.create({
        data:{
            title:content.title,
            createrid:userId,
            content:content.description,
        }
    })
    res.status(201).json({message:"Blog created"})
   }catch(e){
    console.log(e)
   }

})

app.get('/blogs', async (req, res) => {
    const content = await prisma.blogs.findMany({
        orderBy: {
            createdat: 'desc'
        },
        select: {
            id:true,
            title: true,
            content: true,
            createdat: true,
            user: {
                select: {
                    name: true
                }
            }
        },
    });

    res.json(content);
});

app.delete('/delete/:id',authUser, async(req, res)=>{
    const userId = req.userId
    const blogId = req.params.id
    try{
        await prisma.blogs.delete({
        where:{
            id: Number(blogId),
            createrid: userId
        }
    })
     res.status(200).json({message:"Blog deleted"})
    }catch(e){
        res.json({e})
    }
})

app.post('/share', authUser, async(req, res)=>{
    const id = req.body.id
    const share = req.body.share

    if(share){
        const linkExist = await prisma.link.findFirst({
            where:{
                content:id
            }
        })
        if(linkExist){
            res.status(200).json({link:linkExist?.link})
            return
        }

        try{
            const linkId = nanoid(10)
            await prisma.link.create({
                data:{
                    link:linkId,
                    content:id
                }
            })
            res.status(201).json({link:linkId})

        }catch(e){
            res.json({message:"Link created"})
        }
    }else{
        await prisma.link.deleteMany({
            where:{
                content:id
            }
        })
        res.json({message:"link deleted"})
    }


})

app.get('/share/:nanoid', authUser, async(req, res)=>{
    const id = req.params.nanoid
    const content = await prisma.link.findFirst({
        where:{
            link:id
        },
        include:{
            blogs:true
        }
    })
    res.status(200).json({content})

})

app.listen(PORT,()=>{
    console.log('Server Running on '+PORT)
})