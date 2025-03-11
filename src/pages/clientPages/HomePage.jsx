import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ClientLayout from '../../layout/ClientLayout'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const testing = async()=>{
        return
    }

  return (
    <div>
        <ClientLayout />
        <div className='text-3xl text-center'>Home Page</div>
        <div className='flex gap-5'>
            <div className='btn' onClick={()=>navigate('/admin')}>admin</div>
            <div className='btn' onClick={()=>navigate('/auth/login')}>Login</div>
            <div className='btn' onClick={()=>navigate('/auth/signup')}>Sign Up</div>
            <div className='btn' onClick={()=>navigate('/product')}>Products</div>
            <div className='btn' onClick={()=>navigate('/cart')}>Cart</div>
            <div className='btn' onClick={()=>navigate('/order')}>Order</div>
            <div className='btn' onClick={()=>navigate('/testing')}>testing</div>    
        </div>
    </div>
  )
}

export default HomePage