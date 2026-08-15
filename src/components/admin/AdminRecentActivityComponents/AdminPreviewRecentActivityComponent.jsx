import React from 'react'
import { FiActivity, FiX } from 'react-icons/fi';
import { format } from 'date-fns'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import ErrorComponent from '../../ErrorComponent';
import LoadingComponent from '../../LoadingComponent';

const AdminPreviewRecentActivityComponent = ({ activityIcons, activityStyles, activity_id }) => {

    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)

    const [activity, setActivity] = useState(null)

    useEffect(() => {
        if (!activity_id) return;
        const fetch = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/activity/activity_preview_page/${activity_id}`, {withCredentials: true})
                setActivity(res.data.data)
                console.log("fetchActivityPreview response:", res.data)
            } catch (error) {
                console.error("fetchActivityPreview :", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        };
        fetch()
    }, [activity_id])

    if(loading) return <LoadingComponent />
    if(error || !activity ){ return <ErrorComponent />}

    const formatTime = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd MMM yyyy - p")}`
    }

    const Icon = activityIcons[ activity?.activity_type] || FiActivity

  return (

    <div className="p-2 font-inter text-lg font-medium text-gray-900">
        <p className="text-gray-700 text-center text-xl font-bold uppercase mt-2">Activity Details</p>
        <div className="flex-1 overflow-y-auto mt-7">

            <div className="mb- flex items-center gap-3">
                <div className={`flex items-center justify-center rounded-xl border p-1.5 ${activityStyles[activity.activity_type]} `}><Icon size={35} /></div>
                <div>
                    <p className="text-lg font-semibold mb-1 text-gray-800">{activity.title}</p>
                    <p className="text-base text-gray-400">{formatTime(activity.createdAt)}</p>
                </div>
            </div>

            <div className="mt-5 text-gray-500 text-base rounded-lg bg-slate-100 p-4">{activity.description}</div>

            <div className="overflow-hidden rounded-lg border p-2 mt-5">
                <DetailRow label="Activity Type" value={ activity.activity_type }/>
                <DetailRow label="Action" value={activity.action}/>
                <DetailRow label="Performed By" value={ activity.performed_by?.name ||"Unknown" }/>
                <DetailRow label="Staff ID" value={ activity.performed_by?.staff_id || "---" } last/>
            </div>

            <div className="overflow-hidden rounded-xl bg-gray-800 p-4 mt-5">
                <pre className="overflow-x-auto text-base leading-5 text-white">
                    {JSON.stringify( activity.metadata, null, 2 )}
                </pre>
            </div>

        </div>
    </div>  

  )
}

const DetailRow = ({ label, value, last = false }) => { 
    return (
        <div className={` flex items-center justify-between gap-4 px-2 py-3 ${!last ? "border-b border-gray-100" : ""}`}>
            <span className="text-sm text-gray-500 font-semibold">{label}</span>
            <span className="truncate text-right text-sm font-semibold text-gray-700">{value}</span>
        </div>
    )
}

export default AdminPreviewRecentActivityComponent