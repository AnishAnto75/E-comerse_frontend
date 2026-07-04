import React from 'react'
import { FaFire } from 'react-icons/fa'
import { FaArrowTrendUp } from 'react-icons/fa6'

const AdminSupplierTopRequestedComponent = ({requested_products}) => {
  return (
    <div className="bg-white w-full overflow-x-auto rounded-2xl shadow-md border px-6 pt-5 pb-4 mt-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Top Requested Products</h2>
            <div className="flex items-center gap-2 text-orange-500 font-medium"><FaFire />Most Demanded</div>
        </div>
        <div className="flex gap-5 overflow-x-auto py-2">
        {requested_products?.map((product, index) => (
            <div key={index} className="w-60 flex-shrink-0 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold bg-orange-100 text-orange-600 px-2 py-1 rounded-full">#{index + 1}</span>
                    <FaArrowTrendUp size={18} className="text-green-500" />
                </div>

                <h3 className="mt-4 font-semibold text-gray-600 tracking-normal line-clamp-2 text-[17px]" title={product.product_name}>{product.product_name}</h3>
                <div className="mt-3 flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Requests</span>
                    <span className="font-semibold text-orange-600">{product.request_count}</span>
                </div>

            </div>
        ))}
        </div>
    </div>
  )
}

export default AdminSupplierTopRequestedComponent