
import SideBar from './SideBar'
import { Outlet } from 'react-router'


function Pannel() {
  return (
    <section className='w-10/12 mx-auto grid grid-cols-5 gap-1'>
    <div className='col-span-1'>
        <SideBar/>
    </div>
    <div className='col-span-4'>
        <Outlet/>
    </div>
    </section>
  )
}

export default Pannel