import React from 'react'
import { FiAlertTriangle, FiCheckCircle, FiHeart, FiPackage, FiSlash, FiXCircle } from 'react-icons/fi'

const AdminProductPageSummaryCards = ({data}) => {

    return (
    <div className="grid grid-cols-3 gap-3">
        <div className='bg-white rounded-2xl  border-t-4 border-indigo-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-indigo-500 font-semibold">TOTAL PRODUCTS</p>
                    <h2 className='text-3xl mt-2 font-bold text-indigo-600'>{data.total_products.toLocaleString()}</h2>
                </div>
                <div className={`bg-indigo-50 p-2 rounded-2xl`}>
                    <FiPackage size={35} className="text-indigo-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-amber-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-amber-500 font-semibold">LOW IN STOCK</p>
                    <h2 className='text-3xl mt-2 font-bold text-amber-500'>{data.low_in_stock.toLocaleString()}</h2>
                </div>
                <div className={`bg-amber-50 p-2 rounded-2xl`}>
                    <FiAlertTriangle size={35} className="text-amber-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-red-500 font-semibold">OUT OF STOCK</p>
                    <h2 className='text-3xl mt-2 font-bold text-red-500'>{data.out_of_stock.toLocaleString()}</h2>
                </div>
                <div className={`bg-red-50 p-2 rounded-2xl`}>
                    <FiSlash size={35} className="text-red-600"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminProductPageSummaryCards