import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const AdminSupplierPreviewComponent = ({supplier_id}) => {

    const navigate = useNavigate()
    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)

    const supplier = {
        supplier_address: {
            street : "Neduvilai",
            city : "Karungal",
            district : "Kanyakumari",
            state : "Tamil Nadu",
            pincode : 629157,
            address: "18-17A/1, near sbi"
        },
        supplier_bank_details: {
            bank_name: "State Bank Of India",
            account_number : "452145879563",
            branch_name : "Karungal",
            IFSC : "IFSC7854154785"
        },
        status : "active",
        _id : "69dba2edcbac78d80ab23822",
        supplier_id : "SUP0412375358",
        supplier_name : "Hindustan Agencies",
        supplier_contact_person : "Hind",
        supplier_contact_person_phone : 8546215346,
        supplier_email : "hindustan@gmail.com",
        supplier_phone : 8451726351,
        supplier_gst_no : "JHbjsjknx662akm",
        createdAt : "2026-04-12T13:49:33.126Z"
    }

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


    if(loading){return <LoadingComponent/>}
    if(error){ return <div>Error</div>}
    if(!customer){return <div>Error</div>}

return (
    <div className="p-2 font-inter">
        <div className='text-xl font-semibold text-gray-800'>Supplier Preview</div>
        <div className='text-xl font-semibold text-gray-600 mt-3 pl-3 pt-0.5'>#{supplier.supplier_id}</div>
        <div onClick={()=>navigate(`/admin/supplier/supplier_id/${supplier.supplier_id}`)} className="flex relative cursor-pointer justify-center mt-4 rounded-3xl py-5 flex-col items-center bg-gray-100/70">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ supplier.status == "active" ? "bg-blue-500" : supplier.status == "inactive" ? "bg-amber-500" : "" }`} title={customer.deleted ? "Deleted" : customer.status}/>
            <div className="w-36 h-36 rounded-full bg-blue-100 text-8xl font-inter flex items-center justify-center  uppercase text-blue-700 font-bold">{supplier.supplier_name?.charAt(0)}</div>
            <div className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{supplier.supplier_name}</div>
            <div className='text-lg font-semibold text-gray-600 mt-2'>{supplier.supplier_email}</div>
            <div className='font-semibold text-gray-600 mt-2'>Ph. No. {supplier.supplier_phone}</div>
        </div>

        <div className="mt-5">
            <h3 className="font-medium tracking-wide text-[17px] text-gray-900">Supplier Overview</h3>
            <div className="grid grid-cols-2 gap-5 mt-4">
                <div className="rounded-2xl bg-amber-100 p-4">
                    <p className="text-[15px] font-semibold uppercase text-amber-600">Total INVOICES</p>
                    <h2 className="text-2xl font-bold text-amber-600 mt-2">{customer.order_id?.length}</h2>
                </div>
                <div className="rounded-2xl bg-indigo-100 p-4">
                    <p className="text-[15px] font-semibold uppercase text-indigo-600">AVG PUR VALUE</p>
                    <h2 className="text-2xl font-bold text-indigo-700 mt-2">₹{(customer.total_spending / (customer?.order_id?.length ? customer?.order_id?.length : 1 )).toLocaleString()}</h2>
                </div>
                <div className=" col-span-2 rounded-2xl text-center bg-green-100 p-4">
                    <p className="text-[15px] font-semibold text-green-600">TOTAL PURCHASE VALUE</p>
                    <h2 className="text-2xl font-bold text-green-700 mt-2">₹{customer.total_spending?.toLocaleString()}</h2>
                </div>
            </div>
        </div>

        <div className="mt-5">
            <h3 className="font-medium tracking-wide text-[17px] text-gray-900">Supplier Details</h3>
            <div className="space-y-2 mt-4">

                <div className="rounded-2xl bg-gray-100 p-4">
                    <p className="text-[15px] font-bold uppercase text-gray-500">Contact Person</p>
                    <div className="flex justify-between mt-2">
                        <span className="font-medium text-gray-800">{supplier.supplier_contact_person || "Not Available"}</span>
                        <span className="text-gray-600">{supplier.supplier_contact_person_phone || "-"}</span>
                    </div>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                    <p className="text-[15px] font-bold uppercase text-gray-500">GST Number</p>
                    <p className="mt-2 font-medium text-gray-800 tracking-wider">{supplier.supplier_gst_no || "Not Available"}</p>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                    <p className="text-[15px] font-bold uppercase text-gray-500">Address</p>
                    <p className="mt-2 text-gray-800 font-medium">{supplier.supplier_address.address}</p>
                    <p className="mt-1 text-gray-800 font-medium">{supplier.supplier_address.street}, {supplier.supplier_address.city}</p>
                    <p className="mt-1 text-gray-800 font-medium">{supplier.supplier_address.district}</p>
                    <p className="mt-1 text-gray-800 font-medium">{supplier.supplier_address.state} - {supplier.supplier_address.pincode}</p>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                    <p className="text-[15px] font-bold uppercase text-gray-500">Bank Details</p>

                    <div className="mt-3 space-y-2 text">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Bank</span>
                            <span className="font-medium text-gray-800">{supplier.supplier_bank_details.bank_name || "-"}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">A/C Number</span>
                            <span className="font-medium text-gray-800">{supplier.supplier_bank_details.account_number || "-"}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">IFSC</span>
                            <span className="font-medium text-gray-800">{supplier.supplier_bank_details.IFSC || "-"}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Branch</span>
                            <span className="font-medium text-gray-800">{supplier.supplier_bank_details.branch_name || "-"}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
)
}

export default AdminSupplierPreviewComponent