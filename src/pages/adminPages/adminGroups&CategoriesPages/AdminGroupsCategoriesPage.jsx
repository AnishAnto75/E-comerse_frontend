import { useState } from "react";
import {
    FiPlus,
    FiSearch,
    FiChevronDown,
    FiChevronRight,
    FiMoreVertical,
    FiEdit,
    FiTrash2,
    FiEye,
    FiFolder,
    FiPackage,
    FiLayers,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";


const AdminGroupsCategoriesPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const [expandedGroup, setExpandedGroup] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [search, setSearch] = useState("");

    const [summary, setSummary] = useState(null)
    const [groups, setGroups] = useState(null)
    const [pagination , setPagination] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/product-group/groups_categories_page`, { params: { page, limit}, withCredentials: true });
                console.log("fetchGroupsCategoriesPage payload : " , res.data)
                setSummary(res.data?.data?.summary)
                setGroups(res.data?.data?.groups)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                console.error("Error in fetchGroupsCategoriesPage:", error);
                toast.error( error?.response?.data?.message || "Unable to fetch Group Categories")
            } finally { setLoading(false);}
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <LoadingSpinner/>}
    if(error || !summary || !groups ){return <ErrorComponent/>}

    const toggleGroup = (id) => {
        setExpandedGroup(prev => prev === id ? null : id )
    };
    return (
        <div className="flex">
        <AdminSideBar/>
        <div className="w-full p-5 font-inter font-medium text-lg text-gray-900">

            <div className="flex justify-between items-center mb-5 mt-3">
                <div>
                    <h1 className="text-2xl font-semibold">Groups & Categories</h1>
                    <p className="text-gray-500 mt-2 text-base">Organize your products into groups and categories</p>
                </div>
                <button onClick={()=>navigate('/admin/groups-categories/new-group')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Group</button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
                <div className='bg-white rounded-2xl border-t-4 border-blue-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-blue-500 font-semibold">TOTAL GROUPS</p>
                            <h2 className='text-2xl mt-2 font-bold text-blue-600'>{summary.total_groups.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-blue-50 p-2 rounded-2xl`}>
                            <FiFolder size={35} className="text-blue-600"/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-violet-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-violet-500 font-semibold">TOTAL CATEGORIES</p>
                            <h2 className='text-2xl mt-2 font-bold text-violet-600'>{summary.total_categories.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-violet-50 p-2 rounded-2xl`}>
                            <FiLayers size={35} className="text-violet-600"/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sky-500 font-semibold">TOTAL PRODUCTS</p>
                            <h2 className='text-2xl mt-2 font-bold text-sky-600'>{summary.total_products.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-sky-50 p-2 rounded-2xl`}>
                            <FiPackage size={35} className="text-sky-600"/>
                        </div>
                    </div>
                </div>
            </div>

             <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input type="text" placeholder="Search groups / categories" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto border rounded-t-xl mt-5">
                    <div className="borde h-full rounded-xl">
                        {groups?.map((group) => ( 
                            <div key={group._id} className=" border-b overflow-hidden ">
                                <div className=" flex items-center p-1 cursor-pointer hover:bg-gray-50 transition " onClick={() => setExpandedGroup(expandedGroup === group._id ? null : group._id )}>
                                    <div className="w-24 h-24 rounded-xl p-1 overflow-hidden flex-shrink-0 ">
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${group.group_image}`} alt={group.group_name} className=" w-full h-full rounded-xl object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 p-3">
                                        <div className=" font-semibold capitalize">{group.group_name}</div>
                                        <p className="text-base text-gray-500 mt-1 line-clamp-1 ">{group.group_description}</p>
                                        <div className=" flex items-center gap-5 mt-2 text-base text-gray-500 ">
                                            <span>{group.category_count} Categories</span>
                                            <span>{group.product_count.toLocaleString()} Products</span>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 flex-shrink-0 pr-5">{expandedGroup === group._id ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}</div>
                                </div>
                                {/* EXPANDED CATEGORIES */}
                                {expandedGroup === group._id && (
                                    <div className="p-5">
                                        <div className="flex border-t-[3px] border-gray-200/60 pt-5 items-center justify-between mb-3 " >
                                            <div> 
                                                <h3 className="font-semibold text-gray-700 capitalize">Categories</h3>
                                                <p className=" text-base text-gray-500 mt-1 ">Manage categories under{" "}{group.group_name}</p>
                                            </div>
                                            <button onClick={()=>navigate('/admin/groups-categories/new-category')} className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-sky-50 text-sky-500 text-[15px] transition hover:text-sky-600" >
                                                <FiPlus size={20} />Add Category
                                            </button>
                                        </div>
                                        {/* CATEGORY LIST */}
                                        <div className="space-y-1">
                                            {group.categories.map( (category) => (
                                                <div  key={category._id} className=" flex items-center gap-3 shadow-sm border-gray-100 rounded-lg px-3 py-2 transition " >
                                                    <div className=" w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 " >
                                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${category.category_image}`} alt={category.category_name} className=" w-full h-full object-cover "/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 py-3">
                                                        <div className="capitalize">{category.category_name}</div>
                                                        <p className=" text-base text-gray-500 mt-0.5 line-clamp-2" >{category.category_description}</p>
                                                    </div>
                                                    <div className="text-center pr-5">
                                                        <p className="text-base font-semibold">{category.product_count.toLocaleString()}</p>
                                                        <p className="text-sm text-gray-500">Products</p>
                                                    </div>
                                                </div>
                                            ))}
                                            { group.categories.length == 0 && 
                                                <div className="p-5 text-gray-500 text-xl min-h-96 flex items-center justify-center">
                                                    <div>No categories created in this group yet </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* EMPTY STATE */}
                        {groups.length === 0 && (
                            <div className=" py-16 text-center border border-dashed border-gray-200 rounded-2xl ">
                                <FiSearch size={30} className=" mx-auto text-gray-300 mb-3 "/>
                                <p className=" text-sm font-medium text-gray-600">
                                    No groups or categories found
                                </p>
                                <p className=" text-xs text-gray-400 mt-1 ">
                                    Try another search term
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-7 pb-2 flex justify-center border-t ">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"><FaChevronLeft /></button>
                            <button className="w-11 h-11 rounded-xl bg-blue-600 text-white font-semibold">1</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">2</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">3</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">4</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">5</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"><FaChevronRight /></button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        </div>
    );
};


export default AdminGroupsCategoriesPage