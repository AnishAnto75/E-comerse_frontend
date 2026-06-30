import React from 'react'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

const AdminProductPageInventoryTrendsComponent = ({data}) => {
  return (
    <div className="col-span-2 bg-white rounded-2xl shadow-md p-5">
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Inventory Trend</h2>
                <p className="text-gray-600 mt-1">Total inventory value over the last 6 months</p>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="inventory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8e24aa" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8e24aa" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip cursor={false} />
                <Area type="monotone"
                    dataKey="inventory_value"
                    name="Inventory Value"
                    stroke="#8e24aa"
                    fillOpacity={1}
                    fill="url(#inventory)"
                    strokeWidth={2}
                    />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AdminProductPageInventoryTrendsComponent