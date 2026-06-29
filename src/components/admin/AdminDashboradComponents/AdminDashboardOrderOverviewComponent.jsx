import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const AdminDashboardOrderOverviewComponent = ({orderOverviewData}) => {
  return (
    <div className='w-full p-5 mt-5 min-h-[30rem] max-h-[30rem] rounded-lg border-2'>
        <div className='py-1 pb-5'>
            <div className='text-xl text-gray-800 font-semibold'>Order Overview</div>
        </div>
        <ResponsiveContainer width="100%" height={400}>

            <LineChart
                data={orderOverviewData}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 5,
                    left: 0,
                }}
                >
                <Line type="monotone" dataKey="placed" stroke="#3B82F6" strokeWidth={4} name="Placed" />
                <Line type="monotone" dataKey="confirmed" stroke="#10B981" strokeWidth={2} name="Confirmed" />
                <Line type="monotone" dataKey="outForDelivery" stroke="#F59E0B" strokeWidth={2} name="Out For Delevery" />
                <Line type="monotone" dataKey="delivered" stroke="#22C55E" strokeWidth={4} name="Delevered" />
                <Line type="monotone" dataKey="canceled" stroke="#EF4444" strokeWidth={2} name="Canceled" />
                <Line type="monotone" dataKey="returned" stroke="#F97316" strokeWidth={2} name="Returned" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 15 }}/>
                <Legend />
                <Tooltip />
            </LineChart>    
        </ResponsiveContainer>
    </div>
  )
}

export default AdminDashboardOrderOverviewComponent