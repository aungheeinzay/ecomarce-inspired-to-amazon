import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetProductsQuery } from '@/store/slice/prodctApiSlice'
import ProductStatusCard from './ProductStatusCard';
import { DataTable } from '@/components/admintable/ProductTable';

import { Link } from 'react-router';

function ManageProduct() {
    const {data:response,isError,isLoading} = useGetProductsQuery({})
    if(isError){
        <Card>
            <CardContent>
                <p className='text-destructive'>Faild to reload products.Please try again</p>
            </CardContent>
        </Card>
    }
    
  return (
    <section className='grid gap-2'>
       <h1 className='text-3xl font-bold'>Products</h1>
        <div className='my-4 flex items-center justify-between'>
           
        <p>manage your product inventory and take action</p>
       
          <div>
        <Link to={"/admin/createPorduct"} className='cursor-pointer text-lg underline'>add a new product</Link>
    </div>
     </div>
  <div className='grid grid-cols-3 gap-3'>
    <div>
        <ProductStatusCard isLoading={isLoading} title='Total Products' value={response?.length!}/>
    </div>
    <div>
        <ProductStatusCard isLoading={isLoading} title='In Stock' value={response?.filter((p)=>p.instock_count>0).length!}/>
    </div>
    <div>
        <ProductStatusCard isLoading={isLoading} title='Out Stock' value={response?.filter((p)=>p.instock_count<1).length!}/>
    </div>
  </div>
  <Card>
    <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
        <CardDescription>manage and sort your products</CardDescription>
    </CardHeader>
    <CardContent>
        <DataTable data={response ?? []}/>
    </CardContent>
  </Card>
    </section>
  )
}

export default ManageProduct