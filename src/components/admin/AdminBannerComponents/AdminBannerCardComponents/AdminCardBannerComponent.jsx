import { Button, Chip, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react'
import AdminBannerProductCardComponent from './AdminBannerProductCardComponent'

const AdminCardBannerComponent = ({banner}) => {
  return (
    <div>
        <div className='flex max-w-full gap-5'>
            <Tooltip content="Type" className='text-xs bg-transparent text-gray-600'>
                <Chip size="md" variant="gradient" value={"Card"} className='w-20 text-center'/>
            </Tooltip>
            <Tooltip content="Location" className='text-xs bg-transparent text-gray-600'>
                <Chip size="md" color='teal' variant="gradient" value={banner?.banner_location ? banner.banner_location : ""} className='w-20 text-center'/>
            </Tooltip>
            {banner?.hidden && <Chip size="md" color='blue' variant="gradient" value={'HIDDEN'} className='w-20 text-center'/>}
        </div>
        <div className='my-5'>
            <div className='font-poppins pb-2'>Products</div>
            <div className='flex py-1 overflow-x-auto gap-2 mx-auto'>
            {banner.card?.product_id?.map((product, index)=>(  
                <AdminBannerProductCardComponent key={index} product={product}/>
            ))}
            </div>
        </div>
    </div>
  )
}

export default AdminCardBannerComponent