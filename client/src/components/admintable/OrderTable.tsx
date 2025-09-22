import React from 'react'
import {fakeOrders} from "@/utils/fakeData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'


function OrderTable() {
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
                    </tr>
                </thead>
                <tbody>
                    {
                        fakeOrders.map((order,i)=>(
                            <tr key={order.id} className={cn(i%2===0 && "bg-gray-100 ","border")}>
                                <td className='p-2'>{order.id}</td>
                                  <td className='p-2'>{order.customer}</td>
                                  <td className='p-2'>{order.createdAt}</td>
                                  <td className='p-2'>${order.bill}</td>
                                  <td className='p-2'><Badge className='w-1/2' variant={order.status==="cancelled" ?
                                    "destructive" : "default"
                                  }>{order.status}</Badge></td>
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