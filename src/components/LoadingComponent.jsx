import React from 'react'

const LoadingComponent = () => {
  return (
    <div className="flex min-h-full items-center justify-center">
        <div className="animate-spin rounded-full h-28 w-28 border-t-5 border-b-2 border-blue-500"/>
    </div>
  )
}

export default LoadingComponent