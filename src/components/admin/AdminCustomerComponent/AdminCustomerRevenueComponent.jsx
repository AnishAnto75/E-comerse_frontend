import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, BarChart, AreaChart, Area, Bar } from "recharts";

const AdminCustomerRevenueComponent = ({data}) => {
  return (
    <div className="col-span-5 rounded-2xl shadow-md p-5">
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Customer Revenue</h2>
                <p className="text-gray-600 mt-1">Monthly revenue generated from customers</p>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.customerRevenueData} margin={{ top: 10, right: 20, left: 10, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}K`} tick={{ fontSize: 14 }} tickLine={false} axisLine={false}/>
                <Tooltip cursor={false} formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue" ]}/>
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: "#2563EB" }} activeDot={{ r: 7 }}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminCustomerRevenueComponent