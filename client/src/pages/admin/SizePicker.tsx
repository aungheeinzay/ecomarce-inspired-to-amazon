import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface sizePickerProps{
    sizes:string[]
    onChange:(colors:string[])=>void
}

function SizePicker({sizes,onChange}:sizePickerProps) {
    const availableSizes=["xl","xxl","lg","md","sm","xsm"]
    const toggleSizes=(selectedSize:string)=>{
        if(sizes.includes(selectedSize)){
            onChange(sizes.filter((size)=>size!==selectedSize))
        }else{
            onChange([selectedSize,...sizes])
        }
    }
  return (
    <div className="flex items-center gap-2">
        {
            availableSizes.map((size)=>(
        <Button key={size} variant={"outline"}
        onClick={()=>toggleSizes(size)}
        className={cn(sizes.includes(size) && "bg-primary text-white hover:bg-amber-600")}
        >{size.toLocaleUpperCase()}</Button>
    ))
        }
    </div>
  )
}

export default SizePicker