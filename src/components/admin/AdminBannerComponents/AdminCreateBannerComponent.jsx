import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'

const AdminCreateBannerComponent = () => {
    const [isCreateBanner, setCreateBanner] = useState(false)

    const handleCreateBanner = ()=> setCreateBanner(!isCreateBanner)
  return (
    <div>
        {!isCreateBanner ?
            <div className='h-[calc(100vh-250px)] content-center text-center '>
                <Button onClick={()=>handleCreateBanner()} color='blue' variant="gradient" >Create Banner</Button>
            </div>
        :
            <div className='content-center min-h-[calc(100vh-200px)] text-center '>
                <div>

                kjbbkj
                </div>
            </div>
        }
    </div>
  )
}

export default AdminCreateBannerComponent