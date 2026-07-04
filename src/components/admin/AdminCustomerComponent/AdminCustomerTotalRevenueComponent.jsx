import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const AdminCustomerTotalRevenueComponent = ({totalRevenue}) => {
  return (
    <div className='col-span-1 rounded-xl shadow-md border p-5'>
        <div className='text-gray-600 font-semibold tracking-normal text-lg'>Total Revenue</div>
        <div className='flex items-center gap-3 py-3 font-inter'>
            <span className='text-3xl font-semibold text-gray-800 flex items-center'><FaIndianRupeeSign size={28} />{totalRevenue?.value?.toLocaleString()}</span>
            <span className={`flex items-center font-medium ${totalRevenue?.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                {totalRevenue?.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                {Math.abs(totalRevenue?.increment)}%
            </span>
        </div>
        <ResponsiveContainer width="100%" height={250}>            
            <AreaChart data={totalRevenue?.chartData}>
                <defs>
                    <linearGradient id="colordata" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} padding={{ left: 12, right: 10 }} />
                <Tooltip cursor={false}/>
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="indigo"
                    fillOpacity={1}
                    fill="url(#colordata)"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1100}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminCustomerTotalRevenueComponent