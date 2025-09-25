
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { useGetAllOrderQuery } from '@/store/slice/orderApiSlice'
import { Loader } from 'lucide-react'
import ActionStatus from './ActionStatus'


function OrderTable() {
    const {data:orders=[],isLoading} = useGetAllOrderQuery(null)
    if(isLoading){
        return <Loader/>
    }
    
  return (
    <div>
        <Card >
            <CardHeader>
                <CardTitle>Recent Order</CardTitle>
                <CardDescription>view your recent order here</CardDescription>
            </CardHeader>
            <CardContent>
            <table className='text-sm border rounded-lg w-full'>
                <thead className='bg-gray-300 py-3'>
                    <tr className='bg-muted/50'>
                        <th className='p-2 text-start'>Order ID</th>
                        <th className='p-2 text-start'>Customers</th>
                        <th className='p-2 text-start'>Date</th>
                        <th className='p-2 text-start'>amount</th>
                        <th className='p-2 text-start'>Status</th>
                        <th className='p-2 text-start'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,i)=>(
                            <tr key={order._id} className={cn(i%2===0 && "bg-gray-100 ","border")}>
                                <td className='p-2'>{i}</td>
                                  <td className='p-2'>{order.customer}</td>
                                  <td className='p-2'>{new Date(order?.createdAt)?.toLocaleDateString("default",{
                                    month:"short",
                                    day:"2-digit"
                                  })}</td>
                                  <td className='p-2'>${order.bill}</td>
                                  <td className='p-2'><Badge className='w-[100px]' variant={order.status==="cancelled" ?
                                    "destructive" : "default"
                                  }>{order.status}</Badge></td>
                                  <td><ActionStatus status={order.status!} orderId={order._id}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </CardContent>
        </Card>
    </div>
  )
}

export default OrderTable