import React from 'react'
import { useSelector } from 'react-redux'
import { getCart } from '../../../slices/clientSlice/CartSlice'
import CheckOutProductCard from './CheckOutProductCard'

const CheckOutProductsComponent = () => {
    const cartProducts = useSelector(getCart)
  return (
    <div className='gap-2 flex flex-col'>
        {
            cartProducts?.map(((product, index) => <CheckOutProductCard key={index} product={product} />)) 
        }
    </div>
  )
}

export default CheckOutProductsComponent