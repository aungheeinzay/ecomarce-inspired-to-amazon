import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { productFormSchema, type productFormPage } from "@/schema/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ImageUpload from "./ImageUpload"
import CategorySelect from "./CategorySelect"
import ColorPicker from "./ColorPicker"
import SizePicker from "./SizePicker"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface productFormProps{
    initialData?:any
    onSubmit:(data:productFormPage)=>void
    isLoading:boolean
}


function ProductForm({initialData,onSubmit,isLoading}:productFormProps) {
    const form = useForm<productFormPage>({
        resolver:zodResolver(productFormSchema),
        defaultValues:initialData || {
            name:"",
            description:"",
            price:0,
            colors:[],
            sizes:[],
            is_feature:false,
            ratingCount:0,
            category:"",
            images:[],
            instock_count:0,
            is_new_arrival:false

        }
    })
    
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField control={form.control}
            name="name"
            render={({field})=><FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input {...field}/>
                </FormControl>
            </FormItem>}/>
            <div className="grid grid-cols-2 gap-1">
                  <FormField control={form.control}
            name="price"
            render={({field})=><FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" {...field} onChange={(e)=>field.onChange(parseFloat(e.target.value))}/>
                </FormControl>
            </FormItem>}/>

              <FormField control={form.control}
            name="instock_count"
            render={({field})=><FormItem>
                <FormLabel>Instock Count</FormLabel>
                <FormControl>
                    <Input type="number" {...field} onChange={(e)=>field.onChange(parseFloat(e.target.value))}/>
                </FormControl>
            </FormItem>}/>
            </div>
             <FormField control={form.control}
            name="images"
            render={({field})=><FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                    <ImageUpload images={field.value} onChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
            {/* category */}
             <FormField control={form.control}
            name="category"
            render={({field})=><FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <CategorySelect value={field.value} onChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
            {/* colors */}
             <FormField control={form.control}
            name="colors"
            render={({field})=><FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                    <ColorPicker colors={field.value} onChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
            {/* sizes */}
             <FormField control={form.control}
            name="sizes"
            render={({field})=><FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                    <SizePicker sizes={field.value} onChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
            {/* is new arrival */}
           <div className="grid grid-cols-2 gap-2">
              <div className=" border  rounded-lg py-2">
                 <FormField control={form.control} 
            name="is_new_arrival"
            render={({field})=><FormItem className="flex items-center gap-2 ps-2">
                <FormLabel>New Arrival</FormLabel>
                <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
             </div>
                {/* is feature */}
                 <div className=" border rounded-lg py-2 ps-2">
                 <FormField control={form.control} 
            name="is_feature"
            render={({field})=><FormItem className="flex items-center gap-2">
                <FormLabel>Feature</FormLabel>
                <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                </FormControl>
            </FormItem>}/>
             </div>
           </div>
           <Button disabled={isLoading}>{
           isLoading ? "saving..." 
           : initialData ? "update product"
           : "create product"}</Button>
        </form>
    </Form>
  )
}

export default ProductForm