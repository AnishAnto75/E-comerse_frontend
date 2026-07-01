import React from 'react'

const AdminProductPageInventoryInsightsComponent = ({data}) => {
    const active_products_percentage = (((data.active_products ?? 0) / (data?.total_products || 1)) * 100).toFixed(1)
    const healthy_stock = data.total_products - data.low_in_stock - data.out_of_stock
    const healthy_stock_percentage = (((healthy_stock ?? 0) / (data?.total_products || 1)) * 100).toFixed(1)
    const low_stock_percentage = ((data.low_in_stock / data.total_products) *100).toFixed(1)
    const out_of_stock_percentage = ((data.out_of_stock / data.total_products) *100).toFixed(1)
    const inactive_products_percentage = ((data.inactive_products / data.total_products) *100).toFixed(1)
  return (
    <div className="rounded-2xl shadow-md p-6 ">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Inventory Insights</h2>
        <div className="space-y-6">
            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Active Products ({data.active_products})</span>
                    <span className="font-semibold text-cyan-600">{active_products_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-cyan-500 transition-all duration-500" style={{ width: `${active_products_percentage}%` }}/>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Healthy Products ({healthy_stock})</span>
                    <span className="font-semibold text-green-600">{healthy_stock_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${healthy_stock_percentage}%` }}/>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Low Stock ({data.low_in_stock})</span>
                    <span className="font-semibold text-amber-800">{low_stock_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${low_stock_percentage}%` }}/>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Out Of Stock ({data.out_of_stock})</span>
                    <span className="font-semibold text-red-500 ">{out_of_stock_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-red-500 transition-all duration-500" style={{ width: `${out_of_stock_percentage}%` }}/>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Inactive Products ({data.inactive_products})</span>
                    <span className="font-semibold text-gray-900 ">{inactive_products_percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full mt-2">
                    <div className="h-3 rounded-full bg-gray-700 transition-all duration-500" style={{ width: `${inactive_products_percentage}%` }}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminProductPageInventoryInsightsComponent