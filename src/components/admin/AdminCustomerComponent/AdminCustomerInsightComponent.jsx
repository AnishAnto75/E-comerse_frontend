import React from 'react'

const AdminCustomerInsightComponent = ({data}) => {

    const active_customer_percentage = ((data?.active_customers / data?.total_customers)*100).toFixed(1)
    const inactive_customer_percentage = ((data?.inactive_customers / data?.total_customers)*100).toFixed(1)
    const blocked_customer_percentage = ((data?.blocked_customers / data?.total_customers)*100).toFixed(1)
    const deleted_customer_percentage = ((data?.deleted_customers / data?.total_customers)*100).toFixed(1)
    const new_customer_percentage = ((data?.new_customers / data?.total_customers)*100).toFixed(1)
    
    return (
    <div className="rounded-2xl col-span-4 shadow-md p-10 ">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Customer Insights</h2>
        <div className="space-y-[17px]">

            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">New Customers ({data.new_customers})</span>
                    <span className="font-semibold text-cyan-500">{new_customer_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-cyan-400 transition-all duration-500" style={{ width: `${new_customer_percentage}%` }}/>
                </div>
            </div>

            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Active Customers ({data.active_customers})</span>
                    <span className="font-semibold text-green-600">{active_customer_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${active_customer_percentage}%` }}/>
                </div>
            </div>

            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Inactive Customers ({data.inactive_customers})</span>
                    <span className="font-semibold text-amber-500">{inactive_customer_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${inactive_customer_percentage}%` }}/>
                </div>
            </div>

            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Blocked Customers ({data.blocked_customers})</span>
                    <span className="font-semibold text-red-500 ">{blocked_customer_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-red-500 transition-all duration-500" style={{ width: `${blocked_customer_percentage}%` }}/>
                </div>
            </div>

            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Deleted Customers ({data.deleted_customers})</span>
                    <span className="font-semibold text-gray-700 ">{deleted_customer_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-gray-600 transition-all duration-500" style={{ width: `${deleted_customer_percentage}%` }}/>
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default AdminCustomerInsightComponent