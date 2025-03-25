import React, { useEffect, useRef, useState } from 'react'
import {Button, Card, CardBody, CardHeader, Input, Tooltip} from '@material-tailwind/react'
import { debounce } from 'lodash'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../LoadingSpinner'
import { adminCreateBanner, getAdminCreateBannerError, getAdminCreateBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'

const AdminCreateBannerGroupComponent = ({banner_id}) => {
    const dispatch = useDispatch()

    const status = useSelector(getAdminCreateBannerStatus)
    const error = useSelector(getAdminCreateBannerError)

    const [heading , setHeading] = useState('')
    const [group, setGroup] = useState(null)

    const [group_search_name, setGroupSearchName] = useState('')
 
    const [searchedGroups , setSearchedGroups] = useState(null)

    const requestGroupByName = debounce(async (term) => {
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/group-name/${term}`)
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

    const clickName = (group)=>{
        setGroup(group)
        setSearchedGroups(null)
        setGroupSearchName(group.group_name)
    }

    const createCardBanner = async()=>{
        if(group && group._id && heading){
            const data = {banner_id , banner_type: "group", group:{ group_id : group?._id, heading }}
            console.log({data})
            dispatch(adminCreateBanner(data))
        }
    }

    if(status === 'loading'){return <LoadingSpinner/>}
    if(error){ return <div>Error occured please refresh the page</div>}

  return (
    <div>
        <div className='flex gap-2 w-10/12'>
            <Input variant="standard" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} className='' />
            <div className='w-full relative '>
                <Input variant="standard" color='blue' value={group_search_name ? group_search_name : ''} onChange={(e)=>handleSearchGroupName(e)} label="Group Name" className=''/>
                {searchedGroups?.length ? 
                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                        {searchedGroups.map((group, index)=>(
                            <div key={index} onClick={()=>clickName(group)} className="hover:bg-gray-100 text-xs font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{group.group_name}</div>
                        ))}
                    </div>
                    :''
                }
            </div>
        </div>
        <Button disabled={!banner_id || !heading} onClick={()=>createCardBanner()} color='blue' variant='gradient' className='min-w-32 text-center mt-5'>Submit</Button>
        {group ?  
        <div className='mt-5'>
            <div className='pt-5 pb-3 pl-2 '>
                <div className='font-poppins pb-2 h-6 text-gray-700'>{ heading ? heading : 'Heading'}</div>
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
        <div className='content-center text-center h-[calc(100vh-450px)] text-gray-500'>Select Group</div>
        }
    </div>
  )
}

export default AdminCreateBannerGroupComponent