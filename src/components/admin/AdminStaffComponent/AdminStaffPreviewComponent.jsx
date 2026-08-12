import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import ErrorComponent from '../../ErrorComponent'

const AdminStaffPreviewComponent = ({staff_id}) => {

    const navigate = useNavigate()
    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)

    const [staff, setStaff] = useState(null)

    useEffect(() => {
        if (!staff_id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/staff/staff_preview_page/${staff_id}`, {withCredentials: true})
                setStaff(res.data.data);
                console.log("fetchStaffPreview response:", res.data);
            } catch (error) {
                console.error("fetchStaffPreview :", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [staff_id])

    if(loading){return <LoadingComponent/>}
    if(error || !staff){ return <ErrorComponent />}

return (
    <div className="p-2 font-inter font-medium text-lg text-gray-900">
        <div className='text-xl font-semibold '>STAFF PREVIEW</div>
        <div className='text-xl font-semibold text-gray-600 mt-3 '>#{staff.staff_id}</div>
        <div className="flex relative justify-center mt-4 rounded-3xl py-5 flex-col items-center bg-slate-50">

            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ staff.status == "active" ? "bg-blue-500" : staff.status == "inactive" ? "bg-gray-600" : "bg-red-500" }`} title={staff.status}/>
            <div onClick={()=>navigate(`/admin/staff/staff_id/${staff.staff_id}`)} className='bg-white rounded-full p-2 mb-2 cursor-pointer '>
                <img src={`${import.meta.env.VITE_IMAGE_URL}${staff?.photo?.url}`} alt={staff?.name} className="w-[135px] h-[135px] rounded-full object-contain"/>
            </div>
            
            <div className='text-xl font-semibold mt-1 pt-0.5 line-clamp-1'>{staff.name}</div>
            <div className='font-semibold text-gray-600 mt-2'>{staff.email}</div>
            <div className='font-semibold text-gray-600 mt-1'>{staff.phone_number}</div>
        </div>
        
        <div className='flex mt-4 gap-2 w-full justify-center'>
            <span className={`px-3 py-1 rounded-xl cursor-default capitalize ${staff.gender == "male" ? "bg-blue-50 text-blue-600" : staff.gender == "female" ? "bg-pink-50 text-pink-600" : " bg-purple-50 text-purple-700"}`} title='gender'>{staff.gender}</span>
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 cursor-default" title='DOB'>{staff?.DOB ? format(staff?.DOB , 'dd/MM/yyy') : "--"}</span>
        </div>    

        <div className="rounded-xl bg-indigo-50 mt-5 px-4 py-3">
            <div className='text-indigo-600'>Department</div>
            <div className='flex capitalize text-indigo-600 font-semibold justify-between items-center mt-2'>
                <span>{staff.department}</span>
                <span>{staff.role}</span>
            </div>
        </div>

        <div className="mt-5">
            <h3>Employee Details</h3>
            <div className="space-y-3 mt-3">

                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-600 ">Joined</span>
                    <span className="font-semibold text-slate-700">{format(staff?.joining_date , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-600">Last login</span>
                    <span className="font-semibold text-slate-700">{format(staff?.last_login , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-emerald-50 px-4 py-3">
                    <span className="text-emerald-800">Salary</span>
                    <span className="font-semibold text-emerald-800 flex items-center"><FaIndianRupeeSign />{staff.salary?.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center rounded-xl bg-indigo-50 px-4 py-3">
                    <span className="text-indigo-800">Qualitifation</span>
                    <span className="font-semibold text-indigo-800 flex items-center">{staff.qualification}</span>
                </div>
                
                <div className="flex justify-between items-center rounded-xl bg-amber-50 px-4 py-3">
                    <span className="text-amber-800">Aadhar No.</span>
                    <span className="font-semibold text-amber-800 flex items-center">{staff.aadhar_number}</span>
                </div>
                
                <div className="rounded-xl bg-rose-50 text-rose-600 px-4 py-3">
                    <div className='capitalize'>Emergency Contact ( {staff.emergency_contact.relation} )</div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className="font-semibold">{staff.emergency_contact.name}</span>
                        <span className="font-semibold flex items-center">{staff.emergency_contact.phone_number}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
)
}

export default AdminStaffPreviewComponent