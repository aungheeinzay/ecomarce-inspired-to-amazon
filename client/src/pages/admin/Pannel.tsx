
import SideBar from './SideBar'
import { Outlet } from 'react-router'


function Pannel() {
  return (
    <section className='w-10/12 mx-auto grid grid-cols-5 my-4 gap-2'>
    <div className='col-span-1 pt-10 rounded-lg border-2 p-2'>
        <SideBar/>
    </div>
    <div className='col-span-4 rounded-lg border-2 p-2'>
        <Outlet/>
    </div>
    </section>
  )
}

export default Pannel