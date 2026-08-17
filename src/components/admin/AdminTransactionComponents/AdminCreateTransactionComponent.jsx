import axios from 'axios'
import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../LoadingSpinner'
import LoadingComponent from '../../LoadingComponent'

const AdminCreateTransactionComponent = ({setCreateTransactionModel, setReload, reload}) => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)

    const [ type, setType ] = useState(null)
    const [ category, setCategory ] = useState('') 
    const [ amount, setAmount ] = useState('') 
    const [ payment_method, setPaymentMethod ] = useState("") 
    const [ reference_no, setReferenceNo ] = useState('') 
    const [ notes, setNotes ] = useState('') 
    const [ transaction_date, setTransactionDate ] = useState('') 

    const validIncomes = [ "Refund Received", "Commission", "Interest", "Other Income" ]
    const validExpenses = [ "Rent", "Electricity", "Internet", "Fuel", "Packaging", "Marketing", "Maintenance", "Tax", "Miscellaneous" ]    
    const validPaymentMethods = [ "Cash", "UPI", "Card", "Bank Transfer", "Cheque", "Wallet", "Other" ]

    const reset = () =>{
        setType(null)
        setCategory('')
        setAmount('')
        setPaymentMethod('')
        setReferenceNo('')
        setNotes('')
        setTransactionDate('')
    }

    const handleSubmit = async()=>{

        if(!type || !category || !amount || !payment_method || !notes || !transaction_date){ toast.warn("Fill all the required details"); return }

        type, category, amount, payment_method, reference_no, notes, transaction_date
        const data = { type , category, amount, payment_method, reference_no, notes, transaction_date }

        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/transaction/create`, data, { withCredentials: true, });
            console.log("createTransaction Data : ",res)
            if(res){
                toast.success(res.data?.message)
                reset()
                setCreateTransactionModel(false)
                setReload(!reload)
            }
        } catch (error) { 
            toast.error(error?.response?.data?.message)
            console.error("error in createTransaction : ",error)
        } finally {setLoading(false)}
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-medium text-lg text-gray-600 " >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={()=>setCreateTransactionModel(false)}/>
        <div className={` relative w-full overflow-hidden rounded-lg p-8 bg-white shadow-md max-w-screen-md `} onClick={(e) => e.stopPropagation()}>
            <div onClick={()=>setCreateTransactionModel(false)} className='absolute right-5 top-5 rounded-full p-1 hover:bg-red-100 text-red-500 cursor-pointer'><BiX size={30}/></div>
            <div className='pt-3 pb-5 text-center border-b-[3px] px-1'>
                <div className='text-2xl font-bold text-gray-800'>CREATE TRANSACTION</div>
                <div className='mt-1.5 text-gray-500 tracking-wide text-[19px]'>Record a new income or expense</div>
            </div>
            <div className='grid grid-cols-2 px-2 gap-3 gap-x-5 text-xl text-center mt-7'>
                <div className='col-span-2 text-start text-gray-800'>Transaction Type<span className="text-red-500 pl-0.5">*</span></div>
                <button onClick={()=>setType('income')} className={`p-7 border-[3px] rounded-xl ${type === "income" ? "text-white bg-green-500 border-green-500 " : "hover:bg-gray-50 text-gray-500"}`}>Income</button>
                <button onClick={()=>setType('expense')} className={`p-7 border-[3px] rounded-xl ${type === "expense" ? "text-white bg-red-500 border-red-500 " : "hover:bg-gray-50 text-gray-500"}`}>Expense</button>
            </div>

            <div className='grid grid-cols-2 px-2 gap-3 text-center mt-8'>
                <div className='col-span-2 text-start text-2xl text-gray-800'>Basic Informations</div>
                <div className="col-span-1 space-y-2">
                    <div className='text-start text-sky-700'>Category<span className="text-red-500 pl-0.5">*</span></div>
                    <select onMouseDown={(e) => { if (!type) { e.preventDefault(); toast.warn("Please select transaction type first.") }}} value={category} onChange={(e)=> setCategory(e.target.value)} className="border p-[15px] px-4 w-full rounded-xl ">
                        <option value='' />
                        { type === "income" && validIncomes?.map(income =>( <option key= {income} value={income}>{income}</option> ))}
                        { type === "expense" && validExpenses?.map(expense =>( <option key= {expense} value={expense} >{expense}</option> ))}
                    </select>
                </div>

                <div className="col-span-1 space-y-2 text-start">
                    <label className="text-sky-700" >Amount<span className="text-red-500 pl-0.5">*</span></label>
                    <input type='number' autoComplete="off" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>

                <div className="col-span-1 space-y-2">
                    <div className='text-start text-sky-700'>Payment Method<span className="text-red-500 pl-0.5">*</span></div>
                    <select value={payment_method} onChange={(e)=> setPaymentMethod(e.target.value)} className="border p-[15px] px-4 w-full rounded-xl ">
                        <option value='' />
                        { validPaymentMethods?.map(method =>( <option key= {method} value={method}>{method}</option> ))}
                    </select>
                </div>

                <div className="col-span-1 space-y-2 text-start">
                    <label className="text-sky-700" >Transaction Date<span className="text-red-500 pl-0.5">*</span></label>
                    <input type='Date' autoComplete="off" value={transaction_date} onChange={(e)=>setTransactionDate(e.target.value)} className="border p-3 px-4 w-full rounded-xl "/>
                </div>

                <div className="col-span-2 space-y-2 text-start">
                    <label className="text-sky-700" >Reference Number</label>
                    <input type='text' autoComplete="off" value={reference_no} onChange={(e)=>setReferenceNo(e.target.value)} className="border p-3 px-4 w-full rounded-xl "/>
                </div>
                
                <div className="col-span-2 space-y-2 text-start">
                    <label className="text-sky-700" >Notes<span className="text-red-500 pl-0.5">*</span></label>
                    <textarea autoComplete="off" value={notes} onChange={(e)=>setNotes(e.target.value)} className="border p-3 px-4 w-full rounded-xl resize-none"/>
                </div>
                
                <div className="col-span-2 flex gap-5 px-5 mt-5">
                    <div className='w-full'><button onClick={()=>reset()} className='p-3 text-red-500 hover:text-red-600'>Reset</button></div>
                    {!loading ?
                        <button onClick={()=>handleSubmit()} className='w-full rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600 none'>Submit</button>
                    :
                    <div className='w-full rounded-xl bg-gray-200 max-h-[52px]'><LoadingComponent height={7} width={7}/></div>
                    }
                </div>

            </div>
        </div>

    </div>
  )
}

export default AdminCreateTransactionComponent