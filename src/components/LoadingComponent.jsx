import React from 'react'

const LoadingComponent = ({height = 24 , width = 24}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
        <div className={`animate-spin rounded-full h-${height} w-${width} border-t-5 border-b-2 border-blue-500`}/>
    </div>
  )
}

export default LoadingComponent