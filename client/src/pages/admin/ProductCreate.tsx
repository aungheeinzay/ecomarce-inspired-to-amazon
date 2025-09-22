import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductForm from "./ProductForm"
import type { productFormPage } from "@/schema/product"
import { useCreateProductMutation } from "@/store/slice/prodctApiSlice"
import { toast } from "sonner"
import { useState } from "react"

function ProductCreate() {
  const [creteProduct,{isLoading}] = useCreateProductMutation()
  const [success,setsuccess] = useState(false)
    const onSubmit =async(data:productFormPage)=>{
      console.log(data);
      const formData = new FormData()
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("category",data.category),
      formData.append("instock_count",String(data.instock_count))
      formData.append("is_feature",String(data.is_feature))
      formData.append("price",String(data.price))
      formData.append("ratingCount",data.ratingCount.toString())
      formData.append("is_new_arrival",String(data.is_new_arrival))

      data.colors.forEach(c=>formData.append("colors[]",c))
      data.sizes.forEach(s=>formData.append("sizes[]",s))
      data.images.forEach(img=>{
        if(img.file){
          formData.append("images",img.file as File)
        }
      })
        try {
        const data = await creteProduct(formData).unwrap()        
        toast.success(data.message)
        setsuccess(true)
        } catch (error) {
          console.log(error);
          toast.error("fail creating product")
        }
    }
    
  return (
    <Card className="mb-4">
  <CardHeader>
    <CardTitle>Add A New Product</CardTitle>
    <CardDescription>Here!, you can add new cards with details</CardDescription>

  </CardHeader>
  <CardContent>
   <ProductForm onSubmit={onSubmit} isLoading={isLoading} success={success}/>
  </CardContent>
</Card>
    
  )
}
export default ProductCreate