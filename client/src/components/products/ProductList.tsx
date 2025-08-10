import {Products} from "../../utils/fakeData"
import ProductCard from "./ProductCard";


const ProductList = () => {
    return (
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-5 mx-auto my-10 w-full px-4">
      {Products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.images[0].url}
          rating={product.rating}
        />
      ))}
    </div>
    );
}

export default ProductList;
