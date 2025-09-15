import { PackagePlus } from "lucide-react"
import { Link } from "react-router"

const pages=[{
    name:"create product",
    path:"/admin/createPorduct",
    icons:<PackagePlus />
}]
function SideBar() {
  return (
    <div>
    {
        pages.map((page,index)=>(
            <div key={index} className="flex gap-2">
                {page.icons}
                <Link to={page.path}>{page.name}</Link></div>
        ))
    }
    </div>
  )
}

export default SideBar