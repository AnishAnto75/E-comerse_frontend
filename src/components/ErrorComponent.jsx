import React from 'react'

const ErrorComponent = () => {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 font-manrope ">
        <div className="fixed inset-0 bg-white "/>
        <div className="flex transform min-h-screen items-center justify-center p-4 text-center">
             <div className="text-center tracking-wider">
                <p className="text-2xl font-semibold text-red-500 ">Error</p>
                <h1 className="mt-4 text-5xl font-semibold text-gray-900 sm:text-7xl">Error Occured</h1>
                <p className="mt-6 text-lg font-semibold text-gray-500 sm:text-xl/8">Reload the page </p>
                <div className="mt-10 tracking-widest">
                    <button onClick={()=>location.reload()} className='bg-sky-500 rounded-xl font-semibold p-3 px-4 text-white' >RELOAD</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ErrorComponent