import { useSelector } from "react-redux";
import ToOrderProduct from "./ToOrderProduct";
import type { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useOrderProductMutationMutation, type orderItemData } from "@/store/slice/prodctApiSlice";
import { toast } from "sonner";



const ToOrderProductList = () => {
    const products = useSelector((state:RootState)=>state.cart.items)
    const totalAmount = products.reduce((sum,{price,quantity})=>{
    return sum+(price*quantity)
    },0)
    const totalItems = products.reduce((sum,{quantity})=>{
        return sum+quantity
    },0)
    const data={
        items:products,
        bill:totalAmount}
    const [orderProductMutation,{isLoading}] = useOrderProductMutationMutation()
    const handleCheckout=async(data:orderItemData)=>{
      try {
         const res =  await orderProductMutation(data).unwrap()
       
        window.location.href=res.url
       
      } catch (error:any) {
        console.log(error);
        toast.error(error.data.message)
      }
    }
    return (
    <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 w-full">
            {products.length===0 ? <p>no cart in order</p> : 
            products.map((p)=>(
                <ToOrderProduct 
                key={p.key} 
                name={p.name} 
                size={p.size} 
                color={p.color}
                image={p.image}
                price={p.price}
                quantity={p.quantity}
                keyId={p.key!}
                />
            ))}
        </div>
        <div className="col-span-1 w-full">
         {
            products.length>0 && 
               <Card>
                <CardHeader>
                    <CardTitle>Total check</CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 ">
                        <p className="font-bold text-lg">total amount - ${totalAmount.toFixed(3)}</p>
                        <p className="font-light text-lg">total items  -  {totalItems}</p>
                        <Button className="w-full cursor-pointer"
                        onClick={()=>handleCheckout(data)} disabled={isLoading}>total checkout</Button>
                    </div>
                </CardContent>
            </Card>
         }
        </div>
    </div>
    );
}

export default ToOrderProductList;
