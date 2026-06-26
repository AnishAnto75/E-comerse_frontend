import React from 'react'
import { useSelector } from 'react-redux'
import { getCartDeliveryCharge, getCartNoOfProductsInCart} from '../../../slices/clientSlice/CartSlice'

const CheckOutAmountComponent = ({products}) => {

    const deliveryCharge = useSelector(getCartDeliveryCharge)
    const no = useSelector(getCartNoOfProductsInCart)
    
    let totalMrp = 0
    let price = 0

    if(products.length){
        products?.map?.((product, index)=>{
            totalMrp += (product?.product_id?.product_inventory_id?.product_stock[0]?.mrp * product.quantity) 
            price += (product?.product_id?.product_inventory_id?.product_stock[0]?.price * product.quantity) 
        })
    }

    const totalAmount = price + deliveryCharge 

  return (
    <div className='text-start'>
        <div className='text-xl'>Price Details</div>
        <div className='border-b my-1' />
        <table className='w-full mt-3'>
            <tbody className=''>
                <tr className='py-1'>
                    <td>Mrp ({no})items </td>
                    <td className='text-end'>&#8377;{totalMrp}</td>
                </tr>
                <tr>
                    <td>Discount </td>
                    <td className='text-end'>&#8377;{totalMrp - price}</td>
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