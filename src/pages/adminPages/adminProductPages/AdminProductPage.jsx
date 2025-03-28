import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip,} from "@material-tailwind/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const AdminProductPage = () => {
    
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [response, setResponse] = useState(null)
    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetchHighSellingProducts = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/high-selling-products`)
                console.log("adminFetchHighSellingProducts payload : " , res.data)        
                setResponse(res.data.data)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in adminFetchHighSellingProducts :" , error)
            } finally { setLoading(false) }
        }
        
        if(handleRef.current) {
            fetchHighSellingProducts()
            handleRef.current = false
        }
    } , [])

    
const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
   
  const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
 
  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}
    if(!response){return <div>Reload the page</div>}

  return (
    <div className='p-2 w-full bg-white'>
        <div className=' col-span-8 grid grid-cols-3 gap-5 w-full px-5 pt-5 text-gray-800'>
            <div className='col-span-1 bg-gray-200 min-h-44 rounded-2xl p-10 flex flex-col'>
                <span>Total Products</span>
                <span className='text-5xl text-center w-full px-5 h-full items-center flex'>{response?.total_products ? response.total_products : "NaN"}</span>
            </div>            
            <div className='relative col-span-1 bg-gray-200 min-h-44 rounded-2xl p-10 flex flex-col'>
                <span className=''>Low In Stock</span>
                <span className='text-5xl text-center w-full px-5 h-full items-center line-clamp-1 flex'>{response?.low_in_stock ? response.low_in_stock : "NaN"} <span className='text-lg pl-2'> Products</span></span>
                <Link to={'/admin/products/low-in-stock'} className='absolute flex bottom-3 right-4 text-sm items-center cursor-pointer hover:text-gray-500 '>View<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="m5 4 7 7-7 7 m6 7 7 7"/></svg></Link>
            </div>     
            <div className='col-span-1 bg-gray-200 min-h-44 rounded-2xl p-10 flex flex-col'>
                <span>Total Stock</span>
                <span className='text-4xl text-center w-full px-5 h-full items-center flex line-clamp-1'>{response?.total_stock ? response.total_stock : "NaN"}</span>
            </div>         
        </div>
        <Card className="w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex  justify-between gap-4 ">
                    <div className="w-full md:w-72 pt-2">
                        <Input label="Search" className='h-5 w-5' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>}/>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 ">
                        <Button variant="outlined" size="sm">view all</Button>
                        <Button size="sm">Add Product</Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">{head}</Typography>
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ img, name, email, job, org, online, date }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                            <tr key={name}>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={img} alt={name} size="sm" />
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">{name}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{email}</Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="flex flex-col">
                                        <Typography variant="small" color="blue-gray" className="font-normal">{job}</Typography> 
                                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{org}</Typography>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip variant="ghost" size="sm"value={online ? "online" : "offline"}color={online ? "green" : "blue-gray"} />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">{date}</Typography>
                                </td>
                                <td className={classes}>
                                    <Tooltip content="Edit User">
                                        <IconButton variant="text"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg></IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">Page 1 of 10</Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">Previous</Button>
                    <Button variant="outlined" size="sm">Next</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default AdminProductPage