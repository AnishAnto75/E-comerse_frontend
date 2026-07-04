import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { FaIndianRupeeSign } from 'react-icons/fa6'

const AdminStaffPreviewComponent = ({staff_id}) => {

    const navigate = useNavigate()
    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    
    const customer = {
        user_id: "USR070232301004",
        email: "customer3@gmail.com",
        name: "Anish Anto",
        gender: "others",
        DOB: "2005-12-05T12:17:55.639Z",
        phoneNumber: 8148222505,
        order_id: [],
        status: "blocked",
        blocked_reason: null,
        ratings: 3,
        deleted: false,
        deletedAt: null,
        address: [],
        cart: [],
        createdAt: "2026-07-02T12:17:55.639Z",
        updatedAt: "2026-07-02T12:17:55.639Z",
        total_spending : 4587,
        last_ordered: "2026-07-02T12:17:55.639Z",
        last_login: "2026-07-02T12:17:55.639Z",
    }

    const staff = {
        staff_id: "STF0627732539",
        name: "staff1",
        email: "staff1",
        gender: "male",
        role: "delivery",
        salary: 15000,
        emergency_contact_name: "Anish",
        emergency_contact_number: "8142569874",
        DOB: "2020-07-04T16:22:25.625Z",
        photo: '/3-08.webp',
        phone_number: "81482225058",
        alternate_phone_number: "81482278059",
        qualification: "BBA",
        pancard_number: "jhhjk",
        aadhar_number: "145826548596",
        bank_details: {
            account_number: "54857965264",
            bank_name: "SBI",
            ifsc_code: "IFSC7485965485",
            account_holder_name: "Staff1",
        },
        addresses: {
            houseNo : "18-17A/1",
            street : "main road",
            landmark : "Near Sbi",
            city: "Karungal",
            pincode: "629157",
            district: "KK Dist",
            state: "Tamil Nadu",
        },
        status: "active",
        joining_date: "2020-07-04T16:22:25.625Z",
        last_login: "2025-05-01T16:22:25.625Z",
    }


    if(loading){return <LoadingComponent/>}
    if(error){ return <div>Error</div>}
    if(!customer){return <div>Error</div>}

return (
    <div className="p-2 font-inter">
        <div className='text-xl font-semibold text-gray-800'>Employee Preview</div>
        <div className='text-xl font-semibold text-gray-600 mt-3 pl-3 pt-0.5'>#{staff.staff_id}</div>
        <div onClick={()=>navigate(`/admin/staff/staff_id/${staff.staff_id}`)} className="flex relative justify-center mt-4 cursor-pointer rounded-3xl py-5 flex-col items-center bg-gray-100/70">

            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ staff.status == "active" ? "bg-blue-500" : staff.status == "inactive" ? "bg-amber-500" : "" }`} title={staff.status}/>
            <div className='bg-white rounded-full p-2 mb-2'>
                <img src={staff.photo} alt={staff?.name} className="w-[135px] h-[135px] rounded-full object-cover"/>
            </div>
            
            <div className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{staff.name}</div>
            <div className='text-lg font-semibold text-gray-800 mt-2'>{staff.email}</div>
            <div className='text-lg font-semibold text-gray-500 mt-2'>Ph. No.{staff.phone_number}</div>
        </div>
        
        <div className='flex mt-4 gap-2 w-full justify-center'>
            <span className={`px-3 py-1 rounded-xl border cursor-default capitalize bg-emerald-50 text-emerald-500`} title='Role'>{staff.role}</span>
            <span className={`px-3 py-1 rounded-xl border cursor-default capitalize ${staff.gender == "male" ? "bg-blue-50 text-blue-600" : staff.gender == "female" ? "bg-pink-50 text-pink-600" : " bg-purple-50 text-purple-700"}`} title='gender'>{staff.gender}</span>
            <span className="px-3 py-1 rounded-xl border bg-blue-50 text-blue-700 cursor-default" title='DOB'>{staff?.DOB ? format(staff?.DOB , 'dd/MM/yyy') : "--"}</span>
        </div>    

        <div className="mt-7">
            <h3 className="font-semibold tracking-wide text-[17px] text-gray-700">Employee Details</h3>
            <div className="space-y-3 mt-3">
                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-600">Phone Number</span>
                    <span className="font-semibold text-slate-700">{staff.phone_number ? staff.phone_number : "--"}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-600">Alternate Ph. No.</span>
                    <span className="font-semibold text-slate-700">{staff.alternate_phone_number ? staff.alternate_phone_number : "--"}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-600 ">Joined</span>
                    <span className="font-semibold text-slate-700">{format(staff?.joining_date , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-600">Last login</span>
                    <span className="font-semibold text-slate-700">{format(staff?.last_login , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-emerald-50 px-4 py-3">
                    <span className="font-medium text-emerald-800">Salary</span>
                    <span className="font-semibold text-emerald-800 flex items-center"><FaIndianRupeeSign />{staff.salary?.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center rounded-xl bg-indigo-50 px-4 py-3">
                    <span className="font-medium text-indigo-800">Qualitifation</span>
                    <span className="font-semibold text-indigo-800 flex items-center">{staff.qualification}</span>
                </div>
                
                <div className="flex justify-between items-center rounded-xl bg-amber-50 px-4 py-3">
                    <span className="font-medium text-amber-800">Aadhar No.</span>
                    <span className="font-semibold text-amber-800 flex items-center">{staff.aadhar_number}</span>
                </div>
                
                <div className="rounded-xl bg-rose-50 px-4 py-3">
                    <div className='text-lg text-rose-800 font-semibold'>Emergency Contact</div>
                    <div className='flex justify-between items-center mt-1'>
                        <span className="font-medium text-rose-800">{staff.emergency_contact_name}</span>
                        <span className="font-semibold text-rose-800 flex items-center">{staff.emergency_contact_number}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
)
}

export default AdminStaffPreviewComponent