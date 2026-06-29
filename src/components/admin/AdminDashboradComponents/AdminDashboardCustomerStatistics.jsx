import React from 'react'
import { Pie, PieChart, Tooltip, Label, Legend, Cell, ResponsiveContainer } from 'recharts';

const AdminDashboardCustomerStatistics = ({customerData}) => {
    
    const COLORS = [ 
        "#3B82F6", 
        "#EC4899", 
        '#8B5CF6',
    ];

    return (
    <div className='rounded-lg bg-ed-200  h-[38.6rem] border-2'>
        <div className='text-xl text-gray-800 bg-red-0 font-semibold pl-5 pt-8 leading-3'>Customer Stastistics</div>
        <ResponsiveContainer width="100%" height={480}>            
            <PieChart className='w-auto h-auto text-center '>
                <Pie data={customerData.total_customer}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#10B981"
                    stroke="none"
                    paddingAngle={-10}
                    />
                <Pie data={customerData.data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="80%"
                    cornerRadius="10%"
                    fill="#2563EB"
                    paddingAngle={2}
                    label
                    >
                {/* for color */}
                {customerData.data.map((entry, index) => (
                    <Cell key={`cell-${index}`}fill={COLORS[index % COLORS.length]}/>
                ))}
                </Pie>
                <Label position="center" fill="white" className='text-xl font-poppins'>{customerData.total_customer[0].value}</Label>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        <div className=' justify-center flex '>
            <div className='bg-gray-100 rounded-full p-3 w-60 text-lg text-center text-cyan-600 font-medium cursor-pointer hover:bg-blue-gray-50'>View Details</div>
        </div>
    </div>
    )
}

export default AdminDashboardCustomerStatistics