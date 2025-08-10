
import ProductList from '../components/products/ProductList';

const Home = () => {
    return (
        <main className='w-11/12 mx-auto'>
            <section>
            <h1 className='text-gray-700 font-bold'>NEW ARRIVALS</h1>
            <ProductList/>
            </section>
            <section>
            <h1 className='text-gray-700 font-bold'>BEST DEALS</h1>
            <ProductList/>
            </section>
        </main>
    );
}

export default Home;
