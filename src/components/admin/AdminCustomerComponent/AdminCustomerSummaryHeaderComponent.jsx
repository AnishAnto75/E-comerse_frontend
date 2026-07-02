import React from 'react'
import { FaUserCheck, FaUserClock, FaUserPlus, FaUsers, FaUserSlash } from 'react-icons/fa'

const AdminCustomerSummaryHeaderComponent = ({data}) => {
  return (
     <div className="grid grid-cols-3 gap-5 mb-8">
        <div className='bg-white rounded-2xl  border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sky-400 font-semibold">TOTAL CUSTOMERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-sky-500'>{data?.total_customers}</h2>
                </div>
                <div className={`bg-sky-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUsers size={26} className="text-sky-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-cyan-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-cyan-400 font-semibold">NEW THIS MONTH</p>
                    <h2 className='text-3xl mt-2 font-bold text-cyan-500'>{data.new_customers}</h2>
                </div>
                <div className={`bg-cyan-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserPlus size={26} className="text-cyan-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl  border-t-4 border-green-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-green-400 font-semibold">ACTIVE CUSTOMERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-green-600'>{data.active_customers}</h2>
                </div>
                <div className={`bg-green-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserCheck size={26} className="text-green-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-amber-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-amber-400 font-semibold">INACTIVE CUSTOMERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-amber-500'>{data.active_customers}</h2>
                </div>
                <div className={`bg-amber-100/80 h-[58px] p-4 rounded-2xl`}>
                    <FaUserClock size={26} className="text-amber-500"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl  border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-red-400 font-semibold">BLOCKED CUSTOMERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-red-500'>{data.blocked_customers}</h2>
                </div>
                <div className={`bg-red-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserSlash size={26} className="text-red-500"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-gray-700 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 font-semibold">DELETED CUSTOMERS</p>
                    <h2 className='text-3xl mt-2 font-bold text-gray-700'>{data.deleted_customers}</h2>
                </div>
                <div className={`bg-gray-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserSlash size={26} className="text-gray-800"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminCustomerSummaryHeaderComponent