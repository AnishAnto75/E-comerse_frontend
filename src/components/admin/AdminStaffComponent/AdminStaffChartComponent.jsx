import React from 'react'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Label} from "recharts";

const AdminStaffChartComponent = ({employe_expenditure, employeeRoleData}) => {

      const COLORS = [ 
        "#3B82F6", 
        "#EC4899", 
        '#8B5CF6',
    ];
    
  return (
    <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="col-span-2 rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Employee Expenditure</h2>
                    <p className="text-gray-600 mt-1">Employee salary and welfare expense. </p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={employe_expenditure?.chartData}>
                    <defs>
                        <linearGradient id="inventory" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8e24aa" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8e24aa" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tickLine={false} />
                    <YAxis tickLine={false} />
                    <Tooltip cursor={false} />
                    <Area 
                        type="monotone"
                        dataKey="expense"
                        name="Expenses"
                        stroke="#8e24aa"
                        fillOpacity={1}
                        fill="url(#inventory)"
                        strokeWidth={2}
                        />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className='col-span-1 rounded-2xl shadow-md p-5'>
            <div className='text-xl text-gray-800 bg-red-0 font-semibold pl-5 pt-5 leading-3'>Employee Roles</div>
            <ResponsiveContainer width="100%" height={344}>            
                <PieChart className='w-auto h-auto text-center '>
                    <Pie data={employeeRoleData.total_employee}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="50%"
                        fill="#10B981"
                        stroke="none"
                        paddingAngle={-10}
                        />
                    <Pie data={employeeRoleData.data}
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
                        {employeeRoleData?.data?.map((entry, index) => (
                            <Cell key={`cell-${index}`}fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Label position="center" fill="white" className='text-xl font-poppins'>{employeeRoleData.total_employee[0].value}</Label>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>

    </div>
  )
}

export default AdminStaffChartComponent