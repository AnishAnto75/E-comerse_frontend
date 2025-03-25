import { Chip, Tooltip } from '@material-tailwind/react'
import React from 'react'

const AdminCategoryBannerComponent = ({banner}) => {
  return (
    <div>
        <div className='flex max-w-full gap-5'>
            <Tooltip content="Type" className='text-xs bg-transparent text-gray-600'>
                <Chip size="md" variant="gradient" value="Category" className='w-24 text-center tracking-wider'/>
            </Tooltip>
            <Tooltip content="Location" className='text-xs bg-transparent text-gray-600'>
                {banner.banner_location && <Chip size="md" color='teal' variant="gradient" value={banner.banner_location} className='w-20 text-center tracking-wider'/>}
            </Tooltip>
            {banner?.hidden && <Chip size="md" color='blue' variant="gradient" value='HIDDEN' className='w-20 text-center'/>}
        </div>
        <div className='border grid grid-cols-12 rounded-md p-5 bg-gradient-to-br from-green-50 via-green-200 to-green-300 min-h-[470px] mt-5'>
            <div className='col-span-3 p-10'>
                <div className='text-3xl font-bold font-poppins text-green-400'>{banner.category?.heading}</div>
            </div>
            <div className='col-span-9 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                {banner.category?.category_id?.map((category, index)=>(
                    <div key={index} className='col-span-1 h-52 relative rounded-lg '>
                        <div className="h-full"><img src={ !category?.category_image ? category?.category_image : "/W1711CHOI_laundry Detergents_ps.webp"} alt={category.category_name} className="h-full w-full object-cover rounded-lg "/></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                        <div className='absolute text-green-50 font-poppins bottom-5 left-5'>{category.category_name}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminCategoryBannerComponent