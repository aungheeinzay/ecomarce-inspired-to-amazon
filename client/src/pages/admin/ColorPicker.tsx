import { Button } from "@/components/ui/button"
import { useState } from "react"
import { OctagonMinus } from "lucide-react"
import { cn } from "@/lib/utils"

interface colorPickerProps{
    colors:string[]
    onChange:(colors:string[])=>void
}

function ColorPicker({colors,onChange}:colorPickerProps) {
    const [inputColor,setInputColor] = useState('#00000')
    const addColor=()=>{
        if(!colors.includes(inputColor)){
            onChange([inputColor,...colors])
        }
    }
    const removerColor=(color:string)=>{
        const newColors = colors.filter((col)=>col!==color)
        onChange(newColors)
    }
    
  return (
    <div className="grid grid-cols-2">
        <div >
            <input type="color" 
            value={inputColor}
            onChange={(e)=>setInputColor(e.target.value)}/>
            <Button type="button" onClick={addColor} variant={"outline"}>add color</Button>
            </div>
         <div className="flex gap-2">
              {
            colors.map((color)=>(
                <div key={color} className="w-[30px] h-[30px] rounded-full group grid place-items-center shadow-md" style={{background:color}}>
                    <OctagonMinus onClick={()=>removerColor(color)} size={20} className={cn("text-white group-hover:block hidden cursor-pointer")}/>
                </div>
            ))
           }
         </div>
    </div>
  )
}

export default ColorPicker