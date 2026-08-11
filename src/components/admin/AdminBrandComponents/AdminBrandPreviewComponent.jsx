import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import ErrorComponent from '../../ErrorComponent'
import PageNotFoundPage from '../../../pages/PageNotFoundPage'
import axios from 'axios'
import LoadingComponent from '../../LoadingComponent'
import { format } from 'date-fns'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { IoIosStar } from 'react-icons/io'
import { FiPackage } from 'react-icons/fi'
import { Link} from 'react-router-dom'

const AdminBrandPreviewComponent = ({brand_id}) => {

    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [brand , setBrand ]  = useState(null)
    
    useEffect(() => {
        if (!brand_id) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(false);
                console.log(`${import.meta.env.VITE_BACKEND_URL}admin/brand/brand_id/${brand_id}`)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/brand/brand_id/${brand_id}`, {withCredentials: true})
                setBrand(res.data.data);
                console.log("fetchBrand response:", res.data);
            } catch (error) {
                console.error("fetchBrand:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [brand_id]);

    if(loading){return <LoadingComponent />}
    if(error || !brand ){ return <ErrorComponent />}

  return (
    <div className="p-2 font-inter text-lg font-medium ">
        <div className='text-xl font-semibold'>Brand Preview</div>
        <div className="flex justify-center mt-5 rounded-3xl py-5 flex-col items-center bg-gray-50">
            <img src={`${import.meta.env.VITE_IMAGE_URL}${brand?.brand_logo.url}`} alt={brand?.brand_name} className="w-36 h-36 text-center bg-white rounded-full p-2 object-cover"/>
            <div className='flex gap-1.5 mt-1' title='Ratings'>
                {Array.from({ length: brand?.brand_average_ratings || 1  }).map((_, index) => (
                    <IoIosStar key={index} className="h-6 w-6 text-amber-500"/>
                ))}
            </div>
            <Link to={`/admin/brands/${brand._id}`} className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{brand?.brand_name}</Link>
        </div>
        <div className='mt-5 px-3 indent-8'>{brand.brand_description}</div>
    </div>
  )
}

export default AdminBrandPreviewComponent