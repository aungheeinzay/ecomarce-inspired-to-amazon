import { Star } from "lucide-react";

interface starProps{
    count:number
}
const RatingToStar = ({count}:starProps) => {
    return (
        <p className="flex items-center">
        {Array.from({length:count}).map((_,i)=>(
            <Star key={i} size={20} className="text-amber-300 fill-amber-400 "/>
        ))}
        </p>
    );
}

export default RatingToStar;
