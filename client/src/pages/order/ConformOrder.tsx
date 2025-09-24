
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { clearCartOrder } from '@/store/slice/card';
import { useConformSessionQuery } from '@/store/slice/prodctApiSlice';
import { Check, CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router'

function ConformOrder() {
    const [searchParams]= useSearchParams()
    const sessionId = searchParams.get("session_id")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {data:order,isLoading,isError} = useConformSessionQuery(sessionId!)
    console.log(order);
    
    useEffect(()=>{
        if(!sessionId){
            navigate("/")
        }else{
            dispatch(clearCartOrder())
        }
    },[sessionId,isError])
    
  return (
    <Card className='w-5/12 mx-auto'>
        <CardHeader>
            <CardTitle className='text-2xl flex gap-2 items-center justify-center'>{order?.status==="paid" && <CheckCircle className='fill-green-500'/>}<span>{isLoading ? "Confirming" : `Confirm Paid`}</span></CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading && <p className='text-green-400 text-4xl'>verifying...</p>}
            {
                order && <div className='grid place-items-center w-full'>
         <p className='text-center flex'>Thanks for your purche <span className='font-bold self-start'> {order.customer}</span></p>
                <div className='w-full font-medium'>Ordered Summary</div>
            
            {
                order?.items.map(({name,price,quantity},i)=>(
                    <div className='flex justify-between items-center w-full border-b py-2' key={i}>
                        <p className='flex gap-1 items-center'><span>{name}</span><span>X {quantity}</span></p>
                        <p className='font-medium'>${price}</p>
                    </div>

                ))
            }
            <p className='flex justify-between items-center w-full py-2'><span>total X {order.totalQuantity}</span><span>${order?.bill.toFixed(2)}</span></p>
            </div>
            }
        </CardContent>
    </Card>
  )
}

export default ConformOrder