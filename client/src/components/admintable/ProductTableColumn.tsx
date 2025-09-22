import type { product } from "@/types/type"

import{ ColumnFaceting, type ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarImage,AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useNavigate } from "react-router";
import { useDeleteProductMutationMutation } from "@/store/slice/prodctApiSlice";
import { toast } from "sonner";

function UseProductColumn():ColumnDef<product>[] {
  const navigate = useNavigate()
 const [deleteProduct,] = useDeleteProductMutationMutation()
  const proudctDeleteHandler = async(id:string,name:string)=>{
    if(window.confirm("Are you sure to delete("+name+")?")){
     try {
      const res = await deleteProduct({id}).unwrap()
      toast.success(res.message)
     } catch (error) {
      console.log(error);
      toast.error("something went wrong")
     }
    }
  }
  return [
    {
        accessorKey:"images",
        header:"image",
        cell:({row})=>{
            const product = row.original;
            const image = product.images
            return (
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
                   {
                    image.map((img)=>(
                         <Avatar>
          <AvatarImage src={img.url} alt={img.alt} />
          <AvatarFallback>{product.name.slice(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
                    ))
                   }
                </div>
            )
        },
        enableSorting:false
    },
    {
        accessorKey:"name",
        header:"name",
        cell:({row})=>{
            const product = row.original
            const name = product.name
            return <p>{name}</p>
        }
    },
    {
      accessorKey:"category",
      header:"categoroy",
      cell:({row})=>{
        const product = row.original
        const category = product.category
        return <p>{category}</p>
      }
    },
    {
      accessorKey:"price",
      header:({column})=>{
        return <Button
        variant={"ghost"}
        onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}>
          <p>$price</p>
          <ArrowUpDown/>
        </Button>
      },
      cell:({row})=>{
        const product = row.original
        const price = product.price
        return <p>${price}</p>
      }
    },
    {
      accessorKey:"instock_count",
      header:({column})=>{
        return <Button
        variant={"ghost"}
        onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}>
          <p>instock_count</p>
          <ArrowUpDown/>
        </Button>
      },
      cell:({getValue})=>{
        const stock = getValue() as number
        return <Badge className="font-bold w-[50px] text-center" variant={stock>10 ? "default" : stock>0 ? "secondary" : "destructive"}>{stock}</Badge>
      }
    },
    {
      id:"actions",
      enableHiding:false,
      cell:({row})=>{
        const product = row.original
        return  <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigate(`/product/single/${product._id}`)}
            >
             <Eye/> view details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>navigate(`/admin/product/${product._id}`)}><Edit/>edit product</DropdownMenuItem>
            <DropdownMenuItem className="group " onClick={()=>proudctDeleteHandler(product._id,product.name)}
            ><Trash className="group-hover:text-red-500"/><span className="group-hover:text-red-500">delete product</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    }
  ]
}

export default UseProductColumn