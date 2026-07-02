import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, BarChart, AreaChart, Area, Bar } from "recharts";

const AdminCustomerGrowthComponent = ({data}) => {
  return (
    <div className="col-span-5 rounded-2xl shadow-md p-5">
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Customer Growth</h2>
                <p className="text-gray-600 mt-1">Monthly customer registrations</p>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.customerGrowthData}>
                <defs>
                    <linearGradient id="customer" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="blue" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="blue" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 14 }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize: 14 }} tickLine={false} axisLine={false}/>
                <Tooltip cursor={false} formatter={(value) => [`${value.toLocaleString()}`, "Customers" ]}/>
                <Area type="monotone" dataKey="customers" stroke="blue" fillOpacity={1} fill="url(#customer)" strokeWidth={1}/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminCustomerGrowthComponent