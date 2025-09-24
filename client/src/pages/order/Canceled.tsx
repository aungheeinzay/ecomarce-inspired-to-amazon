import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Canceled() {
    const navigate =useNavigate()
    useEffect(()=>{
        navigate("/")
    },[])
  return (
    <div>Canceled</div>
  )
}

export default Canceled