
import { useGetFeatureQuery, useGetNewArrivalsQuery } from '@/store/slice/prodctApiSlice';
import ProductList from '../components/products/ProductList';
import { loginSchema } from '@/schema/auth';

const Home = () => {
    const {data:newArrival=[]} = useGetNewArrivalsQuery({})
    console.log(newArrival);
    
    const {data:feature=[]}=useGetFeatureQuery({})
    console.log(feature);
    
    return (
        <main className='w-11/12 mx-auto'>
            <section>
            <h1 className='text-gray-700 font-bold'>NEW ARRIVALS</h1>
            <ProductList Products={newArrival}/>
            </section>
            <section>
            <h1 className='text-gray-700 font-bold'>BEST DEALS</h1>
            <ProductList Products={feature}/>
            </section>
        </main>
    );
}

export default Home;
