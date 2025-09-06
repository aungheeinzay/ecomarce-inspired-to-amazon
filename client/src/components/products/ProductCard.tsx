interface ProductsProps {
    _id:string;
    name:string;
    price:number;
    image:string;
    rating:number;

}
import { Link } from "react-router";
import RatingToStar from "../../utils/RatingToStar"
import { Heart } from 'lucide-react';

const ProductCard = ({_id,name, price, image, rating} : ProductsProps) => {
    return (
        <Link to={`/product/single/${_id}`} className="group bg-gray-400 shadow-md rounded-md relative hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
  <div className="absolute w-[100px] h-[50px] bg-gray-600 z-40 favourite">
    <Heart size={20} color="#ffffff" className='ms-2'/>
  </div>

  <div className="z-30 relative flex flex-col gap-2">
    <div className="mx-auto w-[220px] h-[200px] overflow-hidden rounded-b-xl">
      <img
        src={image}
        alt={name}
        className="object-cover w-full h-full transform duration-300 group-hover:scale-125"
      />
    </div>

    <div className="bg-snow w-[90%] rounded-t-md p-2 mx-auto">
      <p className="text-md text-black font-bold">{name.length >30 ? name.slice(0,30)+"..." : name}</p>
      <p className="text-lg font-bold">$ {price}</p>
      <RatingToStar count={rating} />
    </div>
  </div>

  <div className="absolute bottom-0 bg-gray-600 w-full h-full bg-curve z-20"></div>
</Link>

    );
}

export default ProductCard;
