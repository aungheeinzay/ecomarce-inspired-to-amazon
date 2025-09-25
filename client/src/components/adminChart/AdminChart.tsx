import ProductStatusCard from '@/pages/admin/ProductStatusCard'
import { useGetProductsQuery } from '@/store/slice/prodctApiSlice'
import Chart from './Chart'

function AdminChart() {
    const {data:products=[],isLoading} = useGetProductsQuery({})
    const totalProducts = products.length
    const featureProducts=products.filter(({is_feature})=>is_feature).length
    const newArrival = products.filter(({is_newArrival})=>is_newArrival).length
    const inStock = products.reduce((sum,{instock_count})=>sum+instock_count,0)
  return (
    <div className='grid gap-2'>
        <div className='grid grid-cols-4 gap-2'>
        <ProductStatusCard title='total Products' value={totalProducts} isLoading={isLoading}/>
         <ProductStatusCard title='feature Products' value={featureProducts} isLoading={isLoading}/>
          <ProductStatusCard title='new Arrival Products' value={newArrival} isLoading={isLoading}/>
           <ProductStatusCard title='instock Products' value={inStock} isLoading={isLoading}/>
    </div>
    <Chart data={products}/>
    </div>
  )
}

export default AdminChart