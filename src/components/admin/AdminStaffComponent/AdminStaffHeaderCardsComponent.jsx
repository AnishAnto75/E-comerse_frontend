import React from 'react'
import { FaUserCheck, FaUsers, FaUserSlash } from 'react-icons/fa'
import { FaIndianRupeeSign, FaMoneyBillTrendUp } from 'react-icons/fa6'

const AdminStaffHeaderCardsComponent = ({data}) => {
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        <div className='bg-white rounded-2xl  border-t-4 border-indigo-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-indigo-500 font-semibold">TOTAL EMPLOYEE</p>
                    <h2 className='text-3xl mt-2 font-bold text-indigo-600'>{data.total_employee}</h2>
                </div>
                <div className={`bg-indigo-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUsers size={26} className="text-indigo-600"/>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-green-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-green-500 font-semibold">ACTIVE EMPLOYEE</p>
                    <h2 className='text-3xl mt-2 font-bold text-green-600'>{data.active_employee}</h2>
                </div>
                <div className={`bg-green-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserCheck size={24} className="text-green-600" />
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-red-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-red-500 font-semibold">INACTIVE EMPLOYEE</p>
                    <h2 className='text-3xl mt-2 font-bold text-red-700'>{data.inactive_employee}</h2>
                </div>
                <div className={`bg-red-50 h-[58px] p-4 rounded-2xl`}>
                    <FaUserSlash size={24} className="text-red-600" />
                </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl border-t-4 border-purple-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6' title='Yearly Employee Expenditure'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-purple-500 font-semibold">EMPLOYEE EXPENDITURE</p>
                    <h2 className='text-3xl mt-2 font-bold text-purple-600 flex items-center'><FaIndianRupeeSign size={26} />{data?.employe_expenditure?.value?.toLocaleString()}</h2>
                </div>
                <div className={`bg-purple-50 h-[58px] p-4 rounded-2xl`}>
                    <FaMoneyBillTrendUp size={24} className="text-purple-600" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminStaffHeaderCardsComponent