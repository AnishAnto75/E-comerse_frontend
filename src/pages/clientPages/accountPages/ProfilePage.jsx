import React, { useEffect, useRef, useState } from 'react'
import AccountAddressComponent from '../../../components/clientComponents/accountComponents/AccountAddressComponent'
import { IoMdPerson } from 'react-icons/io'
import useUserStore from '../../../store/authStore'
import { useNavigate , Link, useLocation } from 'react-router-dom'
import PageNotFoundPage from '../../PageNotFoundPage'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { CgProfile } from 'react-icons/cg'
import ClientSidebar from '../../../components/clientComponents/ClientSidebar'

const ProfilePage = () => {
    
    const navigate = useNavigate()

    const handleRef = useRef(true)
    
    const location = useLocation();
    const url = location.pathname.split("/")[1]
    
    const isAuthenticated = useUserStore( (state) => state.isAuthenticated );
    const userLoading = useUserStore( (state) => state.loading );
    const user = useUserStore( (state) => state.user );
    const logout = useUserStore(state => state.logout);
    
    const [email , setEmail] = useState('') 
    const [name , setName] = useState('')
    const [phoneNumber , setPhoneNumber] = useState('')
    const [DOB , setDOB] = useState('')
    const [gender , setGender] = useState('')

    useEffect(() => {
        const initialize = () => {
            setEmail(user.email)
            setName(user.name)
            setPhoneNumber(user.phoneNumber)
            setDOB(user.DOB)
            setGender(user.gender)


        };
        if(handleRef.current && isAuthenticated){
            initialize();
        }
    }, []);

    const handleSubmit = (e)=>{

        e.preventDefault()
        const data = {name, phoneNumber}    
        return
    }

    if(userLoading) { return <LoadingSpinner />}
    if(!isAuthenticated){return <PageNotFoundPage />}

  return (
      <div className="flex justify-center">
        <div className=" max-w-[1920px] px-5 w-full m-14">
            <div className="grid gap-4 gap-y-2 grid-cols-8">
                <ClientSidebar />
                <div className="col-span-6 border min-h-[calc(100vh-190px)] shadow rounded-lg p-8 text-gray-800">
                    <div className='text-2xl font-medium tracking-wide pb-6 text-sky-800'>Profile Information</div>
                    <div className='grid grid-cols-6 gap-5 font-medium text-lg'>

                        <div className="col-span-2">
                            <div>Email Address</div>
                            <input placeholder={user.email} disabled className="p-3 w-full border mt-3 rounded px-4 bg-white" />
                        </div>
                        
                        <div className="col-span-2">
                            <div>Name</div>
                            <input type='text' value={name} onChange={()=>setName(e.target.value)} disabled className="p-3 w-full border mt-3 rounded px-4 bg-white" />
                        </div>
                        
                        <div className="col-span-2">
                            <div>Phone Number</div>
                            <input type='text' value={phoneNumber} onChange={()=>setPhoneNumber(e.target.value)} disabled className="p-3 w-full border mt-3 rounded px-4 bg-white" />
                        </div>
                        
                        <div className="col-span-2">
                            <div>DOB</div>
                            <input type='date' value={DOB} onChange={()=>setDOB(e.target.value)} disabled className="p-3 w-full border mt-3 rounded px-4 bg-white" />
                        </div>
                        
                        <div className="col-span-2">
                            <div>Gender</div>
                            <div className='flex mt-3 gap-10 p-3'>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id="male" name="gender" value="male" onChange={(e)=>setGender(e.target.value)} checked={gender === "male"} className='h-6 w-6'/>
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id="female" name="gender"  value="female" onChange={(e)=>setGender(e.target.value)} checked={gender === "female"} className='h-6 w-6'/>
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id="others" name="gender" value="others" onChange={(e)=>setGender(e.target.value)} checked={gender === "others"} className='h-6 w-6'/>
                                    <label htmlFor="others">Others</label>
                                </div>
                            </div>
                        </div>      
                    </div>

                    <div className='border-b border-gray-300 my-5 mt-6'/>
                    <AccountAddressComponent />
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProfilePage