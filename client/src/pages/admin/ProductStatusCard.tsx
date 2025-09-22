import { Card,CardContent,CardTitle,CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Package } from "lucide-react"

interface productCardProps{
    isLoading:boolean
    value:string | number
    title:string

}
function ProductStatusCard({isLoading,value,title}:productCardProps) {
  return (
      <Card>
        
        <CardHeader><CardTitle className={cn(title==="Out Stock" && "text-red-500","flex gap-2")}>
          {title==="Total Products" && <Package/>} <span> {title}</span>
        </CardTitle></CardHeader>
        <CardContent>
            <div>
                {
                    isLoading ? <Skeleton className='w-full h-8'/> :
                    <div className='text-2xl font-bold'>
                        <span className={cn(title==="Out Stock" && "text-red-500")}>{value}</span>
                    </div>
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default ProductStatusCard