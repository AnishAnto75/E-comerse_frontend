import React from 'react'
import { FaUserCheck, FaUsers, FaUserSlash } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'

const AdminSupplierSummaryCardsComponent = ({data}) => {
  return (
    <div className="grid grid-cols-4 gap-6">
        <div className='bg-white rounded-2xl  border-t-4 border-indigo-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-indigo-500 font-semibold">TOTAL SUPPLIERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-indigo-600'>{data?.total_suppliers}</h2>
                </div>
                <div className={`bg-indigo-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUsers size={26} className="text-indigo-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl  border-t-4 border-emerald-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-emerald-500 font-semibold">ACTIVE SUPPLIERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-emerald-600'>{data.active_suppliers}</h2>
                </div>
                <div className={`bg-emerald-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserCheck size={26} className="text-emerald-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-red-500 font-semibold">INACTIVE SUPPLIERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-red-500'>{data.inactive_suppliers}</h2>
                </div>
                <div className={`bg-red-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserSlash size={26} className="text-red-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-amber-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-amber-500 font-semibold">TOTAL PURCHASE VALUE</p>
                    <h2 className='text-3xl mt-2 font-bold text-amber-500'>{data.total_purchase_value?.toLocaleString()}</h2>
                </div>
                <div className={`bg-amber-50 h-[58px] p-4 rounded-2xl`}>
                    <FaMoneyBillTrendUp size={26} className="text-amber-500"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSupplierSummaryCardsComponent