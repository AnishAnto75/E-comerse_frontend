import React from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa'
import { FaBoxOpen, FaChartLine, FaRupeeSign, FaTags, FaWarehouse } from 'react-icons/fa6'

const AdminProductSummaryCards = ({data}) => {
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {/* Total Products */}
        <div className='bg-white rounded-2xl  border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sky-500 font-semibold">TOTAL PRODUCTS</p>
                    <h2 className='text-3xl mt-2 font-bold text-sky-600'>{data.total_products?.toLocaleString()}</h2>
                </div>
                <div className={`bg-sky-50 h-[58px] p-4 rounded-2xl`}>
                    <FaBoxOpen size={26} className="text-sky-600"/>
                </div>
            </div>
        </div>
        {/* Total Inventory */}
        <div className='bg-white rounded-2xl border-t-4 border-green-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-green-500 font-semibold">TOTAL INVENTORY</p>
                    <h2 className='text-3xl mt-2 font-bold text-green-600'>{data.total_inventory?.toLocaleString()}</h2>
                </div>
                <div className={`bg-green-50 h-[58px] p-4 rounded-2xl`}>
                    <FaWarehouse size={24} className="text-green-600" />
                </div>
            </div>
        </div>
        {/* Inventory Value */}
        <div className='bg-white rounded-2xl border-t-4 border-purple-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-purple-500 font-semibold">INVENTORY VALUE</p>
                    <h2 className='text-3xl mt-2 font-bold text-purple-600'>{data.inventory_value?.toLocaleString()}</h2>
                </div>
                <div className={`bg-purple-50 h-[58px] p-4 rounded-2xl`}>
                    <FaRupeeSign size={24} className="text-purple-600" />
                </div>
            </div>
        </div>
        {/* Brand */}
        <div className='bg-white rounded-2xl border-t-4 border-indigo-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-indigo-500 font-semibold">BRAND</p>
                    <h2 className='text-3xl mt-2 font-bold text-indigo-700'>{data.total_brands?.toLocaleString()}</h2>
                </div>
                <div className={`bg-indigo-50 h-[58px] p-4 rounded-2xl`}>
                    <FaChartLine size={24} className="text-indigo-600" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminProductSummaryCards