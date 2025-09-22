import { ChartLine, icons, Package, PackagePlus, Truck } from "lucide-react"
import path from "path"
import { NavLink } from "react-router"


const pages=[
  {
    name:"create product",
    path:"/admin/createPorduct",
    icons:<PackagePlus />
},
{
  name:"manage product",
  path:"/admin/manageProduct",
  icons:<Package/>
},
{
  name:"chart board",
  path:"/admin/chartBoard",
  icons:<ChartLine/>
},
{
  name:"order list",
  path:"/admin/order",
  icons:<Truck/>
}]
function SideBar() {
  return (
    <div className="flex gap-2 flex-col space-y-4 ">
    {
        pages.map((page,i)=>(
                <NavLink key={i} className={({isActive})=>`${isActive && "bg-gray-700 text-white py-2 px-2 rounded-lg"} flex gap-2 items-center justify-center hover:bg-gray-200 py-2 px-2 rounded-lg `} to={page.path}><span>{page.icons}</span> <span>{page.name}</span></NavLink>
        ))
    }
    </div>
  )
}

export default SideBar