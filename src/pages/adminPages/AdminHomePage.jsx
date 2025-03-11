import React from 'react'

import AdminSideBar from '../../components/admin/AdminSideBar';

const AdminHomePage = () => {
  return (
    <>
    <div className='w-full'>
        <div className='bg-gray-100 h-screen flex items-center justify-center w-full'>
            <div className='container p-10 items-center justify-center  '>
                <div className='font-[arial] mb-5'>Key Metrics</div>
                <div className='container grid grid-cols-3 gap-5 p-5'>
                    <div className='col-span-1 bg-white h-56 rounded-2xl p-10 flex flex-col font-[arial]'>
                        <span className=''>Total Orders</span>
                        <span className='text-5xl pl-5 h-full items-center flex text-center'>205</span>
                    </div>
                    <div className='col-span-1 bg-white h-56 rounded-2xl p-10 flex flex-col font-[arial]'>
                        <span className=''>Total Products</span>
                        <span className='text-5xl pl-5 h-full items-center flex text-center'>50</span>
                    </div>
                    <div className='col-span-1 bg-white h-56 rounded-2xl p-10 flex flex-col font-[arial]'>
                        <span className=''>Total customers</span>
                        <span className='text-5xl pl-5 h-full items-center flex text-center'>17</span>
                    </div>
                    <div className='col-span-2 bg-white h-60 rounded-2xl  flex flex-col font-[arial]'>
                        <span className='px-10 pt-10 pb-3'>Stock overflow</span>
                        
                        <div className='mx-10 flex flex-col gap-2'>
                            <div className='flex'>
                                <div className="w-full rounded-3xl flex ">
                                    <div className="bg-blue-500 font-medium text-white text-sm items-center flex px-5 rounded-3xl" style={{width: "30%"}}>Product 1</div>
                                </div>
                                <div className='pl-1 py-1.5 text-lg'>30</div>
                            </div>
                            <div className='flex'>
                                <div className="w-full rounded-3xl flex ">
                                    <div className="bg-blue-500 font-medium text-white text-sm items-center flex px-5 rounded-3xl" style={{width: "90%"}}>High Grains classic 200g jar</div>
                                </div>
                                <div className='ml-1 my-1.5 text-lg'>90</div>
                            </div>
                            <div className='flex'>
                                <div className="w-full rounded-3xl flex  ">
                                    <div className="bg-blue-500 font-medium text-white text-sm items-center flex px-5 rounded-3xl" style={{width: 60+"%" }}>Palm Candy</div>
                                </div>
                                <div className='ml-1 my-1.5 text-lg'>60</div>
                            </div>
                            
                        </div>

                    </div>
                    <div className='col-span-1 bg-white h-60 rounded-2xl p-10 flex flex-col font-[arial]'>
                        <span className=''>Recent Notification</span>
                    </div>
                </div>
                <div className='h-20'></div>
            </div>
        </div>

    </div>
    </>
  )
}

export default AdminHomePage