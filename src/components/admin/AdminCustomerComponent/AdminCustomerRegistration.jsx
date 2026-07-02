import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, BarChart, AreaChart, Area, Bar } from "recharts";

const AdminCustomerRegistration = ({data}) => {
  return (
    <div className="col-span-6 rounded-2xl shadow-md p-5">
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Customer Registrations</h2>
                <p className="text-gray-600 mt-1">Monthly new customer registrations</p>
            </div>
        </div>
    
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.customerRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 14 }} name="New Registration" tickLine={false} axisLine={false} />
                <YAxis dataKey="registrations" tick={{ fontSize: 14 }} name="New Registration" tickLine={false} axisLine={false}/>
                <Tooltip cursor={false} formatter={(value) => [`${value.toLocaleString()}`, "New Registrations" ]}/>
                <Bar
                    dataKey="registrations"
                    fill="#10B981"
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminCustomerRegistration