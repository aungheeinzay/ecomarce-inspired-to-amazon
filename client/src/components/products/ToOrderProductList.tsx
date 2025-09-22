import { useSelector } from "react-redux";
import {Products} from "../../utils/fakeData"
import ToOrderProduct from "./ToOrderProduct";
import type { RootState } from "@/store";



const ToOrderProductList = () => {
    const products = useSelector((state:RootState)=>state.cart.items)
    return (
        <div>
            {products.length===0 ? <p>no cart in order</p> : 
            products.map((p)=>(
                <ToOrderProduct 
                key={p.productId} 
                name={p.name} 
                size={p.size} 
                color={p.color}
                image={p.image}
                price={p.price}
                quantity={p.quantity}
                keyId={p.key!}/>
            ))}
        </div>
    );
}

export default ToOrderProductList;
