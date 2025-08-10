import {Products} from "../../utils/fakeData"
import ToOrderProduct from "./ToOrderProduct";
const ToOrderProductList = () => {
    return (
        <div>
            {Products.map((p)=>(
                <ToOrderProduct 
                key={p.id} 
                name={p.name} 
                size={p.size[0]} 
                color={p.color[0]}
                image={p.images[0].url}
                price={p.price}/>
            ))}
        </div>
    );
}

export default ToOrderProductList;
