import React from 'react'
import { FaArrowDown, FaArrowUp, FaIndianRupeeSign } from 'react-icons/fa6'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

const AdminPurchaseChartComponent = ({totalPurchaseInvoice , totalPurchaseValue, totalRevenue}) => {
  return (
    <div className='grid grid-cols-3 gap-5 mt-5'>
    
        <div className='col-span-1 shadow-md border rounded-xl p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Purchase Invoices</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800'>{totalPurchaseInvoice.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${totalPurchaseInvoice.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {totalPurchaseInvoice.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(totalPurchaseInvoice.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>            
                <AreaChart data={totalPurchaseInvoice.chartData}>
                    <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0}  padding={{ left: 12, right: 10 }} />
                    <Tooltip cursor={false}/>
                    <Area
                        type="monotone"
                        dataKey="invoices"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1100}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className='col-span-1 shadow-md border rounded-xl p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Purchase Value</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800 flex items-center '><FaIndianRupeeSign size={26} />{totalPurchaseValue.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${totalPurchaseValue.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {totalPurchaseValue.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(totalPurchaseValue.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>            
                <AreaChart data={totalPurchaseValue.chartData}>
                    <defs>
                        <linearGradient id="totalPurchaseValueColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0}  padding={{ left: 12, right: 10 }} />
                    <Tooltip cursor={false}/>
                    <Area
                        type="monotone"
                        dataKey="purchase_value"
                        stroke="#f59e0b"
                        fillOpacity={1}
                        fill="url(#totalPurchaseValueColor)"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1100}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className='col-span-1 rounded-xl shadow-md border p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Revenue</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800 flex items-center'><FaIndianRupeeSign size={26}/>{totalRevenue.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${totalRevenue.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {totalRevenue.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(totalRevenue.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>            
                <AreaChart data={totalRevenue.chartData}>
                    <defs>
                        <linearGradient id="colordata" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} padding={{ left: 12, right: 10 }} />
                    <Tooltip cursor={false}/>
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#059669"
                        fillOpacity={1}
                        fill="url(#colordata)"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1100}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    </div>
  )
}

export default AdminPurchaseChartComponent