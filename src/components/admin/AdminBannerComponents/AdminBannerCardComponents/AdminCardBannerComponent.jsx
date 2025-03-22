import { Button, Card, CardBody, CardHeader, Chip, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react'

const AdminCardBannerComponent = ({banner}) => {
  return (
    <div>
        <div className='flex max-w-full gap-5'>
            <Tooltip content="Type" className='text-xs bg-transparent text-gray-600'>
                <Chip size="md" variant="gradient" value="Card" className='w-20 text-center'/>
            </Tooltip>
            <Tooltip content="Location" className='text-xs bg-transparent text-gray-600'>
                {banner.banner_location && <Chip size="md" color='teal' variant="gradient" value={banner.banner_location} className='w-20 text-center tracking-wider'/>}
            </Tooltip>
            {banner?.hidden && <Chip size="md" color='blue' variant="gradient" value={'HIDDEN'} className='w-20 text-center'/>}
        </div>
        <div className='my-5'>
            <div className='font-poppins pb-2'>{banner.card?.heading}</div>
            <div className='flex py-1 overflow-x-auto gap-2 mx-auto'>
            {banner.card?.product_id?.map((product, index)=>(  
                <Card key={index} className="h-80 min-w-60 max-w-60 hover:bg-gray-50 z-50 ">
                    <CardHeader shadow={false} floated={false} className="h-52">
                        <img src={ product?.product_photos ? product.product_photos : "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"} alt={product?.product_name} className="h-full w-full object-cover"/>
                    </CardHeader>
                    <CardBody>
                        <div className="text-sm  mt-1 ">{product?.product_name}</div>
                    </CardBody>
                </Card>
            ))}
            </div>
        </div>
    </div>
  )
}

export default AdminCardBannerComponent