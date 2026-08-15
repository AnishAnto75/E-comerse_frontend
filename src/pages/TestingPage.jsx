import { useMemo, useState } from "react";
import { FiActivity, FiArchive, FiBox, FiChevronLeft, FiChevronRight, FiClock, FiFilter, FiGrid, FiLayers, FiPackage, FiRefreshCw, FiSearch, FiShoppingBag, FiShoppingCart, FiTag, FiTruck, FiUser, FiUsers, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import AdminSideBar from "../components/admin/AdminSideBar";
import { FaChevronLeft, FaChevronRight, FaEye, FaSearch } from "react-icons/fa";
import { IoCloseSharp, IoFilter } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import AdminPreviewRecentActivityComponent from "../components/admin/AdminRecentActivityComponents/AdminPreviewRecentActivityComponent";

const activityIcons = {
    product: FiBox,
    purchase: FiShoppingBag,
    supplier: FiTruck,
    customer: FiUsers,
    order: FiShoppingCart,
    inventory: FiArchive,
    brand: FiTag,
    category: FiGrid,
    group: FiLayers,
    staff: FiUser
}
const activityStyles = {
    product: "bg-blue-50 text-blue-600 border-blue-100",
    purchase: "bg-violet-50 text-violet-600 border-violet-100",
    supplier: "bg-orange-50 text-orange-600 border-orange-100",
    customer: "bg-cyan-50 text-cyan-600 border-cyan-100",
    order: "bg-indigo-50 text-indigo-600 border-indigo-100",
    inventory: "bg-emerald-50 text-emerald-600 border-emerald-100",
    brand: "bg-pink-50 text-pink-600 border-pink-100",
    category: "bg-yellow-50 text-yellow-600 border-yellow-100",
    group: "bg-purple-50 text-purple-600 border-purple-100",
    staff: "bg-sky-50 text-sky-600 border-sky-100"
}
const actionStyles = {
    created: "bg-emerald-50 text-emerald-600",
    updated: "bg-blue-50 text-blue-600",
    deleted: "bg-red-50 text-red-600",
    restored: "bg-green-50 text-green-600",
    stock_added: "bg-cyan-50 text-cyan-600",
    stock_removed: "bg-orange-50 text-orange-600",
    stock_altered: "bg-purple-50 text-purple-600",
    status_changed: "bg-amber-50 text-amber-600",
    login: "bg-teal-50 text-teal-600",
    logout: "bg-gray-100 text-gray-600"
}

const formatTime = (date) => {

    const diff = Date.now() - new Date(date).getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`
    if (days === 1) return "Yesterday"

    return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric"})
}

const AdminRecentActivityPage = () => {

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [selectedActivity, setSelectedActivity] = useState(null)

    const [activities, setActivities] = useState([])
    const [pagination , setPagination] = useState(null)
    const [unreadCount, setUnreadCount] = useState(null)

    const [activityType, setActivityType] = useState("all")
    const [action, setAction] = useState("all")
    const [viewStatus, setViewStatus] = useState("all")

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    useEffect(()=>{
        const controller = new AbortController();
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/activity/activity_page`, { params: { page, limit, activity_type: activityType, action, viewed: viewStatus}, withCredentials: true, signal: controller.signal})
                console.log("fetchActivitiesPage payload : " , res.data)
                setActivities(res.data?.data?.activities)
                setUnreadCount(res.data?.data?.unreadCount)
                setPagination(res.data?.data?.pagination)
            } catch (error){
                if (error.name === "CanceledError") { return }
                if (axios.isCancel(error)) { return }
                setError(true)
                console.error("error in fetchActivitiesPage :" , error)
            } finally {
                if (!controller.signal.aborted) { setLoading(false) }
            }
        }
        fetch()
        return () => { controller.abort() }
    } , [page, limit, activityType, action, viewStatus])

    const markAsRead = (id) => {
        const activity = activities.find(activity => activity._id === id)
        if (!activity || activity.viewed) return
        setActivities(prev => prev.map(activity => activity._id === id ? { ...activity, viewed: true } : activity ))
        setUnreadCount(prev => Math.max(prev - 1, 0));
    }

    if(error ){return <ErrorComponent/>}

  return (
    <div className="flex">
        <AdminSideBar />
        <div className="w-full border-l min-h-screen p-5 font-inter font-medium text-lg text-gray-900">
            <div className="flex justify-between items-center mt-2">
                <div>
                    <h1 className="text-3xl font-semibold">Recent Activity</h1>
                    <p className="text-gray-500 mt-2">Track the latest actions and updates.</p>
                </div>
                <div className="flex items-center gap-5">
                    <div className={` text-base text-gray-500 transition ${ unreadCount === 0 && "hidden"} `}>
                        <span className="bg-red-500 text-white p-1 rounded-full px-2">{unreadCount}</span> Unread Activities
                    </div>
                </div>
            </div>

            <div className="border flex flex-col mt-5 rounded-xl border-gray-100 p-5">

                <div className="grid gap-3 grid-cols-5">    
                    <select value={activityType} onChange={(e) => { setActivityType(e.target.value); setPage(1) }} className="border rounded-xl text-base px-4 py-3">
                        <option value="all"> All Activities</option>
                        <option value="product">Product</option>
                        <option value="purchase">Purchase</option>
                        <option value="supplier">Supplier</option>
                        <option value="customer">Customer</option>
                        <option value="order">Order</option>
                        <option value="inventory">Inventory</option>
                        <option value="brand">Brand</option>
                        <option value="category">Category</option>
                        <option value="group">Group</option>
                        <option value="staff">Staff</option>
                    </select>

                    <select value={action} onChange={(e) => { setAction(e.target.value); setPage(1) }} className="border rounded-xl text-base px-4 py-3">
                        <option value="all"> All Actions</option>
                        <option value="created">Created</option>
                        <option value="updated">Updated</option>
                        <option value="deleted">Deleted</option>
                        <option value="restored">Restored</option>
                        <option value="stock_added">Stock Added</option>
                        <option value="stock_removed">Stock Removed</option>
                        <option value="stock_altered">Stock Altered</option>
                        <option value="status_changed">Status Changed</option>
                        <option value="login">Login</option>
                        <option value="logout">Logout</option>
                    </select>

                    <select value={viewStatus} onChange={(e) => { setViewStatus(e.target.value); setPage(1) }} className="border rounded-xl text-base px-4 py-3">
                        <option value="all">All Status</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                            
                </div>

                <div className="mt-5 space-y-3 min-h-[calc(100vh-313px)] ">

                    { loading ? 

                        <div className="flex min-h-[calc(100vh-295px)] items-center">
                            <LoadingComponent height={40} width={40} />
                        </div>

                    : activities?.length === 0 ?

                        <div className="flex min-h-[calc(100vh-295px)] flex-col items-center justify-center px-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <FiActivity size={28} />
                            </div>
                            <h3 className="ont-semibold text-gray-700">No activities found</h3>
                            <p className="mt-1 text-base text-gray-400">Try changing your search or filters.</p>
                        </div>

                    : activities?.map(activity => {

                        const Icon = activityIcons[ activity.activity_type] || FiActivity
                        const iconStyle = activityStyles[ activity.activity_type] || "bg-gray-50 text-gray-500 border-gray-100"
                        const actionStyle = actionStyles[ activity.action] || "bg-gray-100 text-gray-600"
                        return (
                            <div key={activity._id} className={` relative flex gap-5 items-center rounded-xl p-3 transition ${!activity.viewed ? "bg-sky-50/70" : "hover:bg-gray-50" }`} >

                                <div className={` flex h-14 w-14 text-3xl shrink-0 items-center justify-center rounded-full border ${iconStyle} `}>
                                    <Icon />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-row items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {!activity.viewed && ( <span className="h-3 w-3 rounded-full bg-sky-500" />)}
                                                <h3 className="text-base">{activity.title}</h3>
                                            </div>
                                            <p className="mt-1 text-base font-normal text-gray-500">{activity.description}</p>
                                        </div>
                                        <div className="flex shrink-0 items-center justify-center gap-1 text-sm text-gray-500">
                                            <FiClock size={16}/>{formatTime(activity.createdAt)}
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className={` rounded-md px-2 py-1 text-base capitalize ${iconStyle}`}>{activity.activity_type}</span>
                                        <span className={` rounded-md px-2 py-1 text-base capitalize ${actionStyle}`}>{activity.action?.replace("_", " ")}</span>
                                        <span className="text-sky-500">•</span>
                                        <span className="text-sm text-cyan-600">By {activity.performed_by?.name || "Unknown"}</span>
                                        <button onClick={() => { markAsRead(activity._id) ;setSelectedActivity(activity) }} className="ml-auto flex items-center gap-1 pr-3 text-sm text-sky-500 ">
                                            <FaEye size={17} /> View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>

                { !loading && pagination &&

                    <div className="pt-5 flex justify-between items-center px-3 border-t ">
                        <div className="text-gray-500">
                            Showing page <span className="text-gray-600">{pagination.current_page}</span> of <span className="text-gray-700">{pagination.total_pages}</span>
                            <span className="mx-3">•</span>
                            {pagination.total_activities} results found
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
        {selectedActivity && (
            <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
                <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
                    <IoCloseSharp onClick={()=>setSelectedActivity(null)} className='absolute top-4 right-4 text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
                    <AdminPreviewRecentActivityComponent activity_id={selectedActivity._id} activityIcons={activityIcons} activityStyles={activityStyles}/>
                </div>
            </div> 
        )}
    </div>
    )
}

export default AdminRecentActivityPage;