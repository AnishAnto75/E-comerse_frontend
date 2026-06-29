import React from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'

const AdminOrderHeaderComponent = ({totalOrders, totalRevenue, pendingOrders}) => {
  return (
    <div className='grid grid-cols-3 gap-5 mt-5'>
    
        <div className='col-span-1 shadow-md border rounded-xl p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Orders</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800'>{totalOrders.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${totalOrders.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {totalOrders.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(totalOrders.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>            
                <AreaChart data={totalOrders.chartData}>
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
                        dataKey="orders"
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

        <div className='col-span-1 rounded-xl shadow-md border p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Revenue</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800'>{totalRevenue.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${totalRevenue.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {totalRevenue.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(totalRevenue.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>            
                <AreaChart data={totalRevenue.chartData}>
                    <defs>
                        <linearGradient id="colordata" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} padding={{ left: 12, right: 10 }} />
                    <Tooltip cursor={false}/>
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="green"
                        fillOpacity={1}
                        fill="url(#colordata)"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1100}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className='col-span-1 rounded-xl shadow-md border p-5'>
            <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Pending Orders</div>
            <div className='flex items-center gap-3 py-3 font-inter'>
                <span className='text-3xl font-semibold text-gray-800'>{pendingOrders.value.toLocaleString()}</span>
                <span className={`flex items-center font-medium ${pendingOrders.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                    {pendingOrders.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                    {Math.abs(pendingOrders.increment)}%
                </span>
            </div>
            <ResponsiveContainer width="100%" height={143}>
                <BarChart data={pendingOrders.chartData} layout="vertical" barSize={120} margin={{bottom:10}}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={false}/>
                    <Bar dataKey="placed" stackId="pending" fill="#3B82F6" radius={[8, 0, 0, 8]}/>
                    <Bar dataKey="confirmed" stackId="pending" fill="#F59E0B"/>
                    <Bar dataKey="out" stackId="pending" fill="#10B981" radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5 mt-2 text-s font-inter tracking-tight ">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Placed ({pendingOrders.chartData[0].placed})</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Confirmed ({pendingOrders.chartData[0].confirmed})</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Out ({pendingOrders.chartData[0].out})</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminOrderHeaderComponent