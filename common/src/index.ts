import z, { email, string } from "zod"


export const signUpSchema = z.object({
    name:string().max(50),
    email:email(),
    password:string().min(8, 'Password must be 8 characters long')
})

export const signInSchema = z.object({
    email:email(),
    password:string().min(8, "password must be 8 characers long")
})


export const updateUserSchema = z.object({
    email:email().optional(),
    name:string().optional(),
    bio: string().optional(),
    password:string().optional(),
    newPassword:string().optional()
})


export const blogSchema = z.object({
    title:string(),
    body:string().optional(),
})

export type signUpType  = z.infer<typeof signUpSchema>
export type singinType = z.infer<typeof signInSchema>
export type updateUserType = z.infer<typeof updateUserSchema>
export type blogType = z.infer<typeof blogSchema>