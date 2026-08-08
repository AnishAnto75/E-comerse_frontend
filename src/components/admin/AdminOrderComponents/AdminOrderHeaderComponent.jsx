import React from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp, FaIndianRupeeSign } from 'react-icons/fa6'

const AdminOrderHeaderComponent = ({pendingOrders}) => {
  return (
    <div className='grid grid-cols- gap-5 mt-5'>

        <div className='col-span-1 rounded-xl shadow-md border p-5'>
            <div className=' text-xl font-semibold mb-3'>Pending Orders</div>
            <ResponsiveContainer width="100%" height={143}>
                <BarChart data={pendingOrders} layout="vertical" barSize={120}>
                    <XAxis type="number" hide />
                    <YAxis hide />
                    <Bar dataKey="placed" stackId="pending" fill="#3B82F6" radius={[8, 0, 0, 8]}/>
                    <Bar dataKey="confirmed" stackId="pending" fill="#F59E0B"/>
                    <Bar dataKey="out" stackId="pending" fill="#10B981" radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5 mt-1">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Placed ({pendingOrders[0].placed})</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Confirmed ({pendingOrders[0].confirmed})</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Out ({pendingOrders[0].out})</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminOrderHeaderComponent