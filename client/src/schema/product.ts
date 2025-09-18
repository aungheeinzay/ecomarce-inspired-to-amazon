import z, { file, size } from "zod"
const images_types=["image/jpg","image/jpeg","image/png","image/webp"]
export const productFormSchema = z.object({
    name:z.string().min(3,{message:"product name too short"}),
    description:z.string().min(10,{message:""}),
    price:z.number().min(0,{message:"price must be grater than 0"}),
    instock_count:z.number(),
    category:z.string(),
    sizes:z.array(z.enum(["sm","md","lg","xl","xs","xxl"])).min(1,{message:"choose at least one size"}),
    colors:z.array(z.string()).min(1,{message:"at least one colors"}),
    images:z.array(z.object({
        file:z.instanceof(File).optional(),
        alt:z.string().optional(),
        preview:z.string().optional(),
        url:z.string().optional(),

    })) .min(1,{message:"at least one image is required"}),
    is_new_arrival:z.boolean(),
    is_feature:z.boolean(),
    ratingCount:z.number().min(0,{message:'rating count must be grater than one'})
})

export type productFormPage = z.infer<typeof productFormSchema>