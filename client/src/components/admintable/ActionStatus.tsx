import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Button } from "../ui/button"
import { useChangeOrderStatusMutation } from "@/store/slice/orderApiSlice"
import { toast } from "sonner"

interface actionStatusProps{
    status:string
    orderId:string
}

function ActionStatus({status,orderId}:actionStatusProps) {
    const [selectedStatus,setSelectedStatus] = useState(status)
    const [changeOrderStatus,{isLoading}] =useChangeOrderStatusMutation()
    const handleChangeStatus=async()=>{
        console.log(selectedStatus);
        
        try {
            const res = await changeOrderStatus({orderId,status:selectedStatus}).unwrap()
            toast.success("status updated")
            console.log(res)
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
   <div className="flex gap-2">
     <Select value={selectedStatus} onValueChange={setSelectedStatus}>
  <SelectTrigger className="w-[80px]" >
    <SelectValue placeholder={selectedStatus} />
  </SelectTrigger>
  <SelectContent>
   {
     ["pending","paid","shipped","delivered","cancelled"].map((status)=>(
        <SelectItem key={status} value={status}>{status}</SelectItem>
     ))
   }
  </SelectContent>
</Select>
<Button disabled={isLoading} variant={"outline"} onClick={handleChangeStatus}>submit</Button>
   </div>
  )
}

export default ActionStatus