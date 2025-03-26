import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import axios from 'axios'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminEditBanner, getAdminEditBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'
import { toast } from 'react-toastify'

const AdminEditGroupComponent = ({banner}) => {

    const dispatch = useDispatch()

    const editStatus = useSelector(getAdminEditBannerStatus)

    const [heading, setHeading] = useState(banner.group?.heading)
    const [group, setGroup] = useState(banner.group?.group_id ? banner.group?.group_id : null)     

    const [addGroupModal, setAddGroupModal ] = useState(false)

    const [group_search_name, setGroupSearchName] = useState('')
    const [searchedGroups , setSearchedGroups] = useState(null)
    
    const clickName = (group)=>{
        setGroup(group)
        setSearchedGroups(null)
        setGroupSearchName('')
        setAddGroupModal(false)
    }

    const requestGroupByName = debounce(async (term) => {
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/group-name/${term}`)
                console.log("requestGroupByName: ",res.data)
                setSearchedGroups(res.data.data) 
            } catch (error) {
                console.error("error in requestGroupByName :" , error)
            }
        }
    },500)

    const handleSearchGroupName = (e) => {
        const term = e.target.value;
        setGroupSearchName(term)
        if(term.length>1){requestGroupByName(term)}
        else{setSearchedGroups(null)}
    }

    const reset = ()=>{
        setHeading(banner.group?.heading)
        setGroup(banner.group?.group_id ? banner.group?.group_id : null)
    }

    const handleEditBanner = ()=>{
        if(!heading){return toast.warn("Heading required")}
        if(!group){return toast.warn("Select required")}
        console.log(group)
        const data = {banner_id: banner.banner_id , banner_type: "group", group:{ group_id: group._id, heading }}
        console.log(data)
        dispatch(adminEditBanner(data))
    }

  return (
    <div className='mt-5'>
        <div className='grid grid-cols-5 gap-5'>
            <div className='col-span-2'>
                <Input variant="standard" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} />
            </div>
            <div className='col-span-1 relative'>
                <Button onClick={()=>reset()} variant='gradient' size='sm' className='top-3 absolute tracking-wider'>Reset</Button>
            </div>
        </div>
        <div>
        {group ?
            <div>
                <div className='pt-5 pb-1 pl-2 flex justify-end px-10'>
                    <Button variant='text' size='sm' color='blue' onClick={()=>setAddGroupModal(true)}>Change</Button>
                </div>
                <div className='border grid grid-cols-12 rounded-md p-5 bg-gradient-to-br from-green-50 via-green-200 to-green-300 min-h-[470px]'>
                    <div className='col-span-3 p-10'>
                        <div className='text-3xl font-bold font-poppins text-green-400'>{group?.group_name}</div>
                    </div>
                    <div className='col-span-9 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                        {group?.category_id?.map((category, index)=>(
                            <div key={index} className='col-span-1 h-52 relative rounded-lg '>
                                <div className="h-full"><img src={ !category?.category_image ? category?.category_image : "/W1711CHOI_laundry Detergents_ps.webp"} alt={category.category_name} className="h-full w-full object-cover rounded-lg "/></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                                <div className='absolute text-green-50 font-poppins bottom-5 left-5'>{category.category_name}</div>
                            </div>         
                        ))}
                    </div>
                </div>
            </div>
        :
            <div onClick={()=>setAddGroupModal(true)} className='col-span-1 h-52 relative rounded-lg border-4 border-dashed border-blue-200 cursor-pointer mt-5 md:w-2/5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="h-full w-full text-blue-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </div>   
        }
        { addGroupModal &&
            <div className="fixed inset-0 overflow-y-auto z-50 ">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"/>
                <div className="flex min-h-screen items-center justify-center p-4 text-center">
                    <div className="inline-block w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"onClick={(e) => e.stopPropagation()} >
                        <button onClick={()=>setAddGroupModal(false)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-red-50 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                        <div>Change Group</div>
                        <div className='relative mt-3'>
                            <Input variant="standard" label="Group Name" color='blue' value={group_search_name} onChange={(e)=>handleSearchGroupName(e)} className='' />
                            {searchedGroups?.length ? 
                                <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                                    {searchedGroups.map((group, index)=>(
                                        <div key={index} onClick={()=>clickName(group)} className="hover:bg-gray-100 text-sm font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{group.group_name}</div>
                                    ))}
                                </div> 
                                :''
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
        <div className='mt-5 flex gap-5'>
            <Button loading={editStatus == 'loading'} color='blue' onClick={()=>handleEditBanner()} variant='gradient' className='w-1/5'>Submit</Button>
        </div>
    </div>
  )
}

export default AdminEditGroupComponent