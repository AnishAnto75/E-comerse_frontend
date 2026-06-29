import React from 'react'
import { BiSolidPurchaseTag } from 'react-icons/bi'
import { FaBoxesStacked } from 'react-icons/fa6'
import { GiProfit } from 'react-icons/gi'
import { TbBrandShopee } from 'react-icons/tb'

const AdminDashboardHeaderComponent = ({purchase, sales, orders,profit}) => {
    return (
        <div className='grid grid-cols-4 justify-between gap-3'>
            {/* Purchase */}
            <div className='bg-white col-span-1 w-full min-h-44 rounded-lg border-2 p-2 px-4'>
                <div className='flex'>
                    <div>
                        <BiSolidPurchaseTag className='bg-amber-100 h-9 w-9 mt-2 text-amber-600 rounded-full p-1'/>
                        <div className='pt-1.5 pb-2 text-gray-600 font-medium'>Purchase</div>
                        <div className='text-2xl text-gray-800 font-medium '>{purchase.total_purchase}</div>
                    </div>
                    {purchase.increament > 0 ?
                        <svg viewBox="-25 0 250 100" className="w-56 pt-2  h-auto text-green-500" fill="none" > <path d="M120 22 L112 34 H117 V48 H123 V34 H128 Z" fill="currentColor"/><path d="M20 94 C45 72,70 60,95 66 C120 72,145 44,170 48 C195 52,215 38,230 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    :
                        <svg viewBox="0 0 500 220" className="w-56 pt-2  h-auto text-red-500" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d=" M30 40 C90 95, 135 115, 180 105 C215 97, 230 90, 255 102 C285 115, 315 140, 350 145 C380 148, 400 140, 425 145 C450 150, 470 160, 490 170 " stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /> <g transform="translate(250 18)"> <rect x="-6" y="-3" width="12" height="30" fill="currentColor" /> <path d="M0 46 L-18 25 H18 Z" fill="currentColor"/></g></svg>
                    }
                </div>
                <div className='pt-3 text-gray-600 font-medium'><span className={purchase.increament > 0 ? "text-green-400" : "text-red-500" }>{purchase.increament}%</span> Compared to previous month </div>
            </div>
            {/* Sales */}
            <div className='bg-white col-span-1 w-full min-h-44 rounded-lg border-2 p-2 px-4'>
                <div className='flex'>
                    <div>
                        <TbBrandShopee className='bg-green-50 h-9 w-9 mt-2 text-green-500 rounded-full p-1'/>
                        <div className='pt-1.5 pb-2 text-gray-600 font-medium'>Sales</div>
                        <div className='text-2xl text-gray-800 font-medium '>{sales.total_sales}</div>
                    </div>
                    {sales.increament > 0 ?
                        <svg viewBox="-25 0 250 100" className="w-56 pt-2  h-auto text-green-500" fill="none" > <path d="M120 22 L112 34 H117 V48 H123 V34 H128 Z" fill="currentColor"/><path d="M20 94 C45 72,70 60,95 66 C120 72,145 44,170 48 C195 52,215 38,230 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        :
                        <svg viewBox="0 0 500 220" className="w-56 pt-2  h-auto text-red-500" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d=" M30 40 C90 95, 135 115, 180 105 C215 97, 230 90, 255 102 C285 115, 315 140, 350 145 C380 148, 400 140, 425 145 C450 150, 470 160, 490 170 " stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /> <g transform="translate(250 18)"> <rect x="-6" y="-3" width="12" height="30" fill="currentColor" /> <path d="M0 46 L-18 25 H18 Z" fill="currentColor"/></g></svg>
                        }
                </div>
                <div className='pt-3 text-gray-600 font-medium'><span className={sales.increament > 0 ? "text-green-400" : "text-red-500" }>{sales.increament}%</span> Compared to previous month </div>
            </div>
            {/* Orders */}
            <div className='bg-white col-span-1 w-full min-h-44 rounded-lg border-2 p-2 px-4'>
                <div className='flex'>
                    <div>
                        <FaBoxesStacked className='bg-purple-50 h-9 w-9 mt-2 text-purple-500 rounded-full p-1'/>
                        <div className='pt-1.5 pb-2 text-gray-600 font-medium '>Orders</div>
                        <div className='text-2xl text-gray-800 font-medium'>{orders.total_orders}</div>
                    </div>
                    {orders.increament > 0 ?
                        <svg viewBox="-25 0 250 100" className="w-56 pt-2  h-auto text-green-500" fill="none" > <path d="M120 22 L112 34 H117 V48 H123 V34 H128 Z" fill="currentColor"/><path d="M20 94 C45 72,70 60,95 66 C120 72,145 44,170 48 C195 52,215 38,230 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        :
                        <svg viewBox="0 0 500 220" className="w-56 pt-2  h-auto text-red-500" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d=" M30 40 C90 95, 135 115, 180 105 C215 97, 230 90, 255 102 C285 115, 315 140, 350 145 C380 148, 400 140, 425 145 C450 150, 470 160, 490 170 " stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /> <g transform="translate(250 18)"> <rect x="-6" y="-3" width="12" height="30" fill="currentColor" /> <path d="M0 46 L-18 25 H18 Z" fill="currentColor"/></g></svg>
                        }
                </div>
                <div className='pt-3 text-gray-600 font-medium'><span className={orders.increament > 0 ? "text-green-400" : "text-red-500" }>{orders.increament}%</span> Compared to previous month </div>
            </div>
            {/* Profit */}
            <div className='bg-white col-span-1 w-full min-h-44 rounded-lg border-2 p-2 px-4'>
                <div className='flex'>
                    <div>
                        <GiProfit className='bg-blue-50 h-9 w-9 mt-2 text-blue-500 rounded-full p-1'/>
                        <div className='pt-1.5 pb-2 text-gray-600 font-medium'>Profit</div>
                        <div className='text-2xl text-gray-800 font-medium '>{profit.total_profit}</div>
                    </div>
                    {profit.increament > 0 ?
                        <svg viewBox="-25 0 250 100" className="w-56 pt-2  h-auto text-green-500" fill="none" > <path d="M120 22 L112 34 H117 V48 H123 V34 H128 Z" fill="currentColor"/><path d="M20 94 C45 72,70 60,95 66 C120 72,145 44,170 48 C195 52,215 38,230 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        :
                        <svg viewBox="0 0 500 220" className="w-56 pt-2  h-auto text-red-500" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d=" M30 40 C90 95, 135 115, 180 105 C215 97, 230 90, 255 102 C285 115, 315 140, 350 145 C380 148, 400 140, 425 145 C450 150, 470 160, 490 170 " stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /> <g transform="translate(250 18)"> <rect x="-6" y="-3" width="12" height="30" fill="currentColor" /> <path d="M0 46 L-18 25 H18 Z" fill="currentColor"/></g></svg>
                    }
                </div>
                <div className='pt-3 text-gray-600 font-medium'><span className={profit.increament > 0 ? "text-green-400" : "text-red-500" }>{profit.increament}%</span> Compared to previous month </div>
            </div>
        </div>
    )
}

export default AdminDashboardHeaderComponent