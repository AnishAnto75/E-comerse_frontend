import React from 'react'
import { useSelector } from 'react-redux'
import { getCartDeliveryCharge, getCartDiscount, getCartNoOfProductsInCart, getCartTotalAmount, getCartTotalMrp, getCartTotalSellingPrice } from '../../../slices/clientSlice/CartSlice'

const CheckOutAmountComponent = () => {

    const totalMrp = useSelector(getCartTotalMrp)
    const price = useSelector(getCartTotalSellingPrice)
    const discount = useSelector(getCartDiscount)
    const no = useSelector(getCartNoOfProductsInCart)
    const deliveryCharge = useSelector(getCartDeliveryCharge)
    const totalAmount = useSelector(getCartTotalAmount)
  return (
    <div className='text-start'>
        <div className='text-xl'>
            Price Details
        </div>
        <div className='divider m-0' />
        <table className='w-full'>
            <tbody className=''>
                <tr className='py-1'>
                    <td>Mrp ({no})items </td>
                    <td className='text-end'>&#8377;{totalMrp}</td>
                </tr>
                <tr>
                    <td>Discount </td>
                    <td className='text-end'>&#8377;{discount}</td>
                </tr>
                <tr>
                    <td>Price </td>
                    <td className='text-end'>&#8377;{price}</td>
                </tr>
                <tr>
                    <td>Delivery Charges </td>
                    <td className='text-end'>&#8377;{deliveryCharge}</td>
                </tr>
                <tr>
                    <td className='p-[5px]'> </td>
                </tr>
                <tr className='text-lg border-t-[1px] text-lite_content font-medium'>
                    <td className='py-2 '>Total Amount</td>
                    <td className='py-2 text-end'>&#8377;{totalAmount}</td>
                </tr>
            </tbody>
        </table>
    </div>  
    )
}

export default CheckOutAmountComponent