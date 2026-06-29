import React from 'react'
import { IoIosStar } from 'react-icons/io'

const AdminDashboardTopProductsComponent = ({topProducts}) => {
    return (
    <div className='rounded-lg bg-white h-[572px] border-2 p-5'>
        <div className='text-xl text-gray-800 font-semibold font-inter pb-5'>Top Products</div>
        <table className='w-full border-b-2'>
            <thead className='text-[16.5px] w-full text-gray-800'>
                <tr>
                    <th className='font-medium py-2'>No</th>
                    <th className='font-medium py-2'>Product Name</th>
                    <th className='font-medium py-2'>Review</th>
                    <th className='font-medium py-2'>Stock</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {topProducts?.map((product, index)=>(
                    <tr key={index} className='h-[72px] border-t-2 text-gray-700'>
                        <td className='min-w-14'>{index+1}</td>
                        <td className='max-w-48'>
                            <div className='flex items-center gap-3 '>
                                <div><img src="/3-08.webp" alt="User Avatar" className="w-12 h-12 rounded-full object-cover"/></div>
                                <div className='text-start line-clamp-2 w-full'>{product.product_name}</div>
                            </div>
                        </td>
                        <td>
                            <div className='flex justify-center'>
                                <IoIosStar className='h-5 w-5 text-amber-500'/>
                                <div>{product.product_average_ratings}</div>
                            </div>
                        </td>
                        <td >{product.product_total_stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className=' justify-center flex py-6'>
            <div className='bg-gray-100 rounded-full p-3 w-60 text-lg text-center text-cyan-600 font-medium cursor-pointer hover:bg-blue-gray-50'>View More</div>
        </div>
    </div>
    )
}

export default AdminDashboardTopProductsComponent