import React from 'react'
import { useDispatch } from 'react-redux'
import { setCheckOutAddress, setCheckOutPaymentMethod } from '../../../slices/clientSlice/OrderSlice'

const CheckOutPaymentMethodComponent = () => {

    const dispatch = useDispatch()

  return (
    <div className='border font-[arial] tracking-wide'>
        <div className='flex p-5 gap-5 '>
            <input type="radio" name="radio-7" onChange={()=>dispatch(setCheckOutPaymentMethod("Cash On Delivery"))} className=" h-5 w-5" />
            <span>CASH ON DELIVERY</span>
        </div>
        <div className='flex p-5 gap-5'>
            <input type="radio" name="radio-7" onChange={()=>dispatch(setCheckOutPaymentMethod("UPI"))} className="h-5 w-5 " />
            <span>UPI</span>
        </div>
    </div>
  )
}

export default CheckOutPaymentMethodComponent 