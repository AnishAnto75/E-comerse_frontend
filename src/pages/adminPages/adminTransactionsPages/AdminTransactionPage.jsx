import { useMemo, useState } from "react";
import { FiArchive, FiBox, FiChevronLeft, FiChevronRight, FiClock, FiFilter, FiGrid, FiLayers, FiPackage, FiRefreshCw, FiSearch, FiShoppingBag, FiShoppingCart, FiTag, FiTruck, FiUser, FiUsers, FiX, FiCheck, FiAlertCircle, FiFileText, FiPlus, FiMinus } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaEye, FaSearch } from "react-icons/fa";
import { IoCloseSharp, IoFilter } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../../../components/ErrorComponent";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import LoadingComponent from "../../../components/LoadingComponent";
import AdminPreviewRecentActivityComponent from "../../../components/admin/AdminRecentActivityComponents/AdminPreviewRecentActivityComponent";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FaIndianRupeeSign, FaMinus, FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { BiX } from "react-icons/bi";
import AdminCreateTransactionComponent from "../../../components/admin/AdminTransactionComponents/AdminCreateTransactionComponent";
import { TbRefresh } from "react-icons/tb";
import { format } from "date-fns";

const paymentMethodColors = {
    "Cash" : "bg-emerald-500",
    "UPI" : "bg-violet-500",
    "Card" : "bg-blue-500",
    "Bank Transfer" : "bg-cyan-500",
    "Cheque" : "bg-amber-500",
    "Wallet" : "bg-pink-500",
    "Other" : "bg-slate-500",
}

const formatTime = (date) => {

    if(isNaN(Date.parse(date))){ return }
    return `${format(new Date(date) , "dd MMM yyyy")}`
}

const AdminTransactionPage = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [reload, setReload] = useState(true)

    const [selectedTransaction, setSelectedTransaction] = useState(null)

    const [transactions, setTransactions] = useState([])
    const [pagination , setPagination] = useState(null)

    const [type, setType] = useState("all")
    const [category, setCategory] = useState("all")
    const [payment_method, setPaymentMethod] = useState("all")

    const incomes = [ "Sales", "Refund Received", "Commission", "Interest", "Other Income" ]
    const expenses = [ "Purchase", "Salary", "Rent", "Electricity", "Internet", "Fuel", "Packaging", "Marketing", "Maintenance", "Tax", "Miscellaneous" ]
    const validPaymentMethods = [ "Cash", "UPI", "Card", "Bank Transfer", "Cheque", "Wallet", "Other" ]

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    const [createTransactionModel, setCreateTransactionModel] = useState(false)

    useEffect(()=>{
        const controller = new AbortController();
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/transaction/transaction_page`, { params: { page, limit, type, category, payment_method}, withCredentials: true, signal: controller.signal})
                console.log("fetchTransactionPage payload : " , res.data)
                setTransactions(res.data?.data?.transactions)
                setPagination(res.data?.data?.pagination)
            } catch (error){
                if (error.name === "CanceledError") { return }
                if (axios.isCancel(error)) { return }
                setError(true)
                console.error("error in fetchTransactionPage :" , error)
            } finally {
                if (!controller.signal.aborted) { setLoading(false) }
            }
        }
        fetch()
        return () => { controller.abort() }
    } , [ page, limit, type, category, payment_method, reload])

    if(error ){return <ErrorComponent />}

  return (
    <div className="flex">
        <AdminSideBar />
        <div className="w-full border-l min-h-screen p-5 font-inter font-medium text-lg text-gray-900">
            <div className="mt-2 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">Financial Transactions</h1>
                    <p className="text-gray-500 mt-2">Track every transaction with clarity.</p>
                </div>
                <button onClick={()=>setCreateTransactionModel(true)} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-base shadow-lg hover:bg-blue-700 transition">Create Transaction</button>
                
            </div>

            <div className="border flex flex-col mt-5 rounded-xl border-gray-100 p-5 ">

                <div className="flex gap-3 text-base">    
                    <select value={type} onChange={(e) => { setType(e.target.value); setPage(1) }} className="border w-full rounded-xl px-4 py-3">
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} className="border w-full rounded-xl px-4 py-3">
                        <option value={"all"}>All Category</option>
                        { type === "income" || "all" && incomes.map((income, index)=> <option key={index} value={income}>{income}</option> ) }
                        { type === "expense" || "all" && expenses.map((expense, index)=> <option key={index} value={expense}>{expense}</option> )}
                    </select>
                    
                    <select value={payment_method} onChange={(e) => { setPaymentMethod(e.target.value); setPage(1) }} className="border w-full rounded-xl px-4 py-3">
                        <option value={"all"}>All Methods</option>
                        { validPaymentMethods.map((method, index)=> <option key={index} value={method}>{method}</option> )}
                    </select>

                    <div onClick={()=>setReload(!reload)} className="p-2 flex items-center rounded-full cursor-pointer justify-center text-cyan-500 hover:text-cyan-600"><TbRefresh size={25} /></div>


                </div>

                <div className="mt-5 space-y-3 min-h-[calc(100vh-313px)] ">

                    { loading ? 

                        <div className="flex min-h-[calc(100vh-295px)] items-center">
                            <LoadingComponent height={40} width={40} />
                        </div>

                    : transactions?.length === 0 ?

                        <div className="flex min-h-[calc(100vh-295px)] flex-col items-center justify-center px-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <FiFileText size={40} />
                            </div>
                            <h3 className="font-semibold text-gray-700">No transactions found</h3>
                            <p className="mt-1 text-base text-gray-400">Try changing your search or filters.</p>
                        </div>

                    : transactions?.map(transaction => (
                        <div key={transaction._id} onClick={()=>setSelectedTransaction(transaction._id)} className={` relative flex gap-5 items-center rounded-xl p-3 transition hover:bg-gray-50 ${selectedTransaction == transaction._id && "bg-slate-100/80" }`} >

                            <div className={` flex h-14 w-14 text-3xl shrink-0 items-center justify-center rounded-full border ${transaction.type === "income" ? "bg-green-50 text-green-500 border-green-100" : transaction.type === "expense" ? "bg-red-50 text-red-500 border-red-100" :"bg-gray-50 text-gray-500 border-gray-100"}`}>
                                {transaction.type === "income" && <GiReceiveMoney size={33}/>}
                                {transaction.type === "expense" && <GiPayMoney size={32}/>}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-row items-start justify-between">
                                    <div>
                                        <div className="text-[17px]">{transaction.title}</div>
                                        <p className="mt-1 text-base font-normal text-gray-500">{transaction.notes}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center justify-center gap-1 text-sm text-gray-500 p-3">
                                        <FiClock size={16}/>{formatTime(transaction.transaction_date)}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-base">
                                        <span className={` rounded-md px-2 py-1 text-white capitalize ${transaction.type === "income" ? "bg-green-500" : transaction.type === "expense" ? "bg-red-500" :"bg-gray-500"} `}>{transaction.category}</span>
                                        <span className={` rounded-md px-2 py-1 capitalize text-white ${paymentMethodColors[transaction.payment_method]}`}>{transaction.payment_method}</span>
                                    </div>
                                    <div className={`pr-3 flex items-center ${transaction.type === "income" ? "text-green-500" : transaction.type === "expense" ? "text-red-500" :"bg-gray-500"} `}>
                                        { transaction.type === "income" && <FaPlus size={16}/>}
                                        { transaction.type === "expense" && <FaMinus size={12}/>}
                                        &nbsp;<FaIndianRupeeSign/>{transaction.amount?.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                { !loading && pagination &&

                    <div className="pt-5 flex justify-between items-center px-3 border-t ">
                        <div className="text-gray-500">
                            Showing page <span className="text-gray-600">{pagination.current_page}</span> of <span className="text-gray-700">{pagination.total_pages}</span>
                            <span className="mx-3">•</span>
                            {pagination.total_transactions} results found
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled={!pagination.has_previous_page || loading} onClick={() => setPage(prev => prev - 1)} className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronLeft /></button>
                            {Array.from({ length: pagination.total_pages }, (_, index) => index + 1).map((pageNumber) => (
                                <button key={pageNumber} disabled={loading} onClick={() => setPage(pageNumber)} className={` w-11 h-11 rounded-xl font-semibold " ${ pagination.current_page === pageNumber ? "bg-blue-600 text-white cursor-default" : "border border-gray-200 text-gray-600 hover:bg-gray-50" }`}>
                                    {pageNumber}
                                </button>
                            ))}
                            <button disabled={!pagination.has_next_page || loading} onClick={() => setPage(prev => prev + 1)} className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronRight /></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Show</span>
                            <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }} className=" px-3 py-2 border border-gray-100 rounded-lg text-base outline-none ">
                                <option value={1}>1</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="text-gray-600">per page</span>
                        </div>
                    </div>
                }

            </div>    
        </div>
        {selectedTransaction && (
            <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
                <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg border border-gray-100 overflow-y-auto p-3'>
                    <IoCloseSharp onClick={()=>setSelectedTransaction(null)} className='absolute top-3 right-3 text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
                        {/* Not Yet Created */}
                </div>
            </div> 
        )}

        { createTransactionModel && 
            <AdminCreateTransactionComponent setCreateTransactionModel={setCreateTransactionModel} setReload={setReload} reload={reload} />
        }

    </div>
    )
}

export default AdminTransactionPage