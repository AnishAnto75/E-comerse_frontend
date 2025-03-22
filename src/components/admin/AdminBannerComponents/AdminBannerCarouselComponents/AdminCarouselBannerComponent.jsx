import { Button, Carousel, Chip, Tooltip } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminCarouselBannerComponent = ({banner}) => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex max-w-full gap-5'>
            <Tooltip content="Type" className='text-xs bg-transparent text-gray-600'>
                <Chip size="md" variant="gradient" value="Carousel" className='w-24 text-center'/>
            </Tooltip>
            <Tooltip content="Location" className='text-xs bg-transparent text-gray-600'>
                {banner.banner_location && <Chip size="md" color='teal' variant="gradient" value={banner.banner_location} className='w-20 text-center tracking-wider'/>}
            </Tooltip>
            {banner?.hidden && <Chip size="md" color='blue' variant="gradient" value={'HIDDEN'} className='w-20 text-center'/>}
        </div>
        <div className='my-5'>
            <div className='font-poppins pb-2'>{banner.carousel?.heading}</div>
            <Carousel loop={true} autoplay={true} transition={{ duration: 3 }} className="rounded-xl h-[30rem]">
                {banner.carousel?.products?.map((product, index)=>(
                    <img key={index} onClick={()=>navigate(`/admin/products/${product?.product_id?.product_barcode}`)} src={ !product.image? product.image : "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt={product.product_id?.product_name ? product.product_id?.product_name : 'alt'} className="h-full w-full object-cover object-center hover:cursor-pointer"/>
                ))}
            </Carousel>
        </div>
    </div>    
  )
}

export default AdminCarouselBannerComponent