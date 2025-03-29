import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorComponent = () => {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 ">
        <div className="fixed inset-0 bg-white "/>
        <div className="flex transform min-h-screen items-center justify-center p-4 text-center">
             <div className="text-center">
                <p className="text-2xl font-semibold text-red-500">Error</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Error Occured</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Reload the page </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button onClick={()=>location.reload()} color='blue' variant='gradient'>Reload</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ErrorComponent