import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleX } from "lucide-react"

interface imageUploadProps{
    images:Array<{preview:string,file?:File,public_alt?:string}>
    onChange:(images:Array<({preview:string,file?:File,public_alt?:string})>)=>void
}


function ImageUpload({images,onChange}:imageUploadProps) {

    const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = Array.from(e.target.files || [])
        const newImages=files.map((file)=>(
            {
                file,
                preview:URL.createObjectURL(file),

            }
        ))
        onChange([...images  ,...newImages])
        // const file=Array.from(e.target.files || [])
        // const newImg = file.map((f,i)=>({
        //     file:f,
        //     preview:URL.createObjectURL(f)
        // }))
        // onChange([...images,...newImg])
    }
    const removeImage=(i:number)=>{
        const newImages = [...images]
        if(images[i].preview.startsWith("blob:")){
            URL.revokeObjectURL(images[i].preview)
        }
        newImages.splice(i,1)
        onChange([...newImages])
    }
  return (
    <div>
        <div className="grid grid-cols-4 gap-2" >
            {images.map((images,i)=>(
                <div key={i} className="h-[200px] overflow-hidden rounded-md relative group">
                    <img src={images.preview}  alt={`previw ${i+1} `} className=" object-cover w-full h-full group-hover:opacity-75 group-hover:scale-150 transition-all duration-100"/>
                    <Button type="button" className="absolute top-0 right-0 bg-transparent group-hover:bg-red-500 " onClick={()=>removeImage(i)}><CircleX/></Button>
                </div>
            ))}
        </div>
        <Button className="my-4" type="button" variant={"outline"} onClick={
            ()=>document.getElementById("image_upload")?.click()
        }>
        Add Image
        </Button>
        <Input hidden id="image_upload" type="file" multiple accept="image/*" onChange={handleFileChange}/>
    </div>
  )
}

export default ImageUpload