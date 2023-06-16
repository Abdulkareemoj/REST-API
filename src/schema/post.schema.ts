import { z } from "zod"

const payload = {
    body: z.object({
        title: z.string({required_error:"Title is required"}),
        body: z.string({required_error:"Body is required"}).min(120, "Body is too short, 120 char min")
    }),
} 
const params = {
    params: z.object({
        postId: z.string({required_error:"postId required"})
    }),
}

export const createPostSchema = z.object({
    ...payload,
})

export const updatePostSchema = z.object({
   ...params,
    ...payload,
})

export const deletePostSchema = z.object({
...params,
})