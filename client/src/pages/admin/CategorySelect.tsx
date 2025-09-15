import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface CategorySelectProps{
    value?:string
    onChange:(value:string)=>void
}
const categories=[
    {
        id:'t-shirt',
        label:'T-Shirt'
    },
    {
         id:'hoodie',
        label:'Hoodie'
    },
    {
         id:'shorts',
        label:'Shorts'
    },
    {
         id:'jeans',
        label:'Jeans'
    }

]
function CategorySelect({value,onChange}:CategorySelectProps) {
  return (
<Select value={value} onValueChange={onChange}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    {
        categories.map((category,i)=>(
            <SelectItem key={i} value={category.id}>{category.label}</SelectItem>
        ))
    }
  </SelectContent>
</Select>
  )
}

export default CategorySelect