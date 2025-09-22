import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductForm from "./ProductForm"
import type { productFormPage } from "@/schema/product"
import { useGetPorductByIdQuery, useUpdateProductsMutationMutation } from "@/store/slice/prodctApiSlice"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"

function ProductUpdate() {
  const [updateMutation,{isLoading}] = useUpdateProductsMutationMutation()
  const [success,setsuccess] = useState(false)
  const navigate = useNavigate()
  const {id}=useParams()
  const {data:singleProduct,isError,} = useGetPorductByIdQuery(id as string)
  useEffect(()=>{
if(isError)navigate("/admin")
  },[singleProduct,isError])
    const onSubmit =async(data:productFormPage)=>{
      
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
      const exitingImage = data.images.filter((img)=>!img.file && img.url && img.alt)
      formData.append("exitingImage",JSON.stringify(exitingImage))
         try {
         const data = await updateMutation({id:id as string,formData}).unwrap()
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
    <CardTitle>Update The Product</CardTitle>
    <CardDescription>Here!, you can edit your product</CardDescription>

  </CardHeader>
  <CardContent>
   <ProductForm onSubmit={onSubmit} isLoading={isLoading} initialData={singleProduct} success={false}/>
  </CardContent>
</Card>
    
  )
}
export default ProductUpdate