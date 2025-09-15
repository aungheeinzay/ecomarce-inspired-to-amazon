import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductForm from "./ProductForm"
import type { productFormPage } from "@/schema/product"

function ProductCreate() {
    const onsSubmit =async(data:productFormPage)=>{
        
    }
    
  return (
    <Card className="mb-4">
  <CardHeader>
    <CardTitle>Add A New Product</CardTitle>
    <CardDescription>Here!, you can add new cards with details</CardDescription>

  </CardHeader>
  <CardContent>
   <ProductForm onSubmit={onsSubmit} isLoading={false}/>
  </CardContent>
</Card>
    
  )
}
export default ProductCreate