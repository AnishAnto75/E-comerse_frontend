import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminRevenueDetailsComponent = ({revenueData}) => {
    return (
    <div className='w-full p-5 mt-5 min-h-[30rem] rounded-lg border-2'>
        <div className='py-1 pb-5'>
            <div className='text-xl text-gray-800 font-semibold'>Revenue Details</div>
        </div>
        <ResponsiveContainer width="100%" height={420}>
            <BarChart
                data={revenueData}
                barGap={"2"}
                margin={{ top: 0, right: 0, left: 0, bottom: 0}}
                >
                <XAxis dataKey="label" tickLine={false} />
                <Tooltip cursor={false}/>
                <Legend />
                <Bar dataKey="sales" fill="#10B981" radius={[10, 10, 0, 0]} />
                <Bar dataKey="purchase" fill="#FFB300" radius={[10, 10, 0, 0]} />
                <Bar dataKey="profit" fill="#2979FF" radius={[10, 10, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminRevenueDetailsComponent