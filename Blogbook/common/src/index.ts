import z from "zod";
export const Signinschema=z.object({
     email: z.email(),    
     password:z.string().min(6,{message:"length should be greater than 5"})
})
export const Signupschema=z.object({
     email: z.email(),  
     name:  z.string().optional(),   
     password:z.string().min(6,{message:"length should be greater than 5"})
})
export const Blogpostschema=z.object({
     title: z.string(),  
     content:  z.string(),
     image: z.string()
})
export const Blogupdateschema=z.object({
     title: z.string().optional(),  
     content:  z.string().optional(),
     image: z.string().optional()
})
export type Signintype=z.infer<typeof Signinschema>;
export type Signuptype=z.infer<typeof Signupschema>;
export type Blogposttype=z.infer<typeof Blogpostschema>;
export type Blogupdatetype=z.infer<typeof Blogupdateschema>;

