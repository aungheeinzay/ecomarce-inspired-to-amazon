import ToOrderProductList from "../components/products/ToOrderProductList";

const ToOrderCards = () => {
    return (
        <main className='max-w-10/12 mx-auto'>
            <h1 className='text-2xl text-gray-600 font-bold'>Your cards added</h1>
            <div>
                <ToOrderProductList/>
            </div>

        </main>
    );
}

export default ToOrderCards;
