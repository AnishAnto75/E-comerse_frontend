import React from 'react'
import { Link } from 'react-router-dom'

const AdminEntryPage = () => {
  return (
    <div className='p-5 flex gap-5'>
        <Link to={'/admin/entry/purchase-entry'} className='btn btn-neutral'>Purchase Entry</Link>
        <Link to={'/admin/entry/all-purchases'} className='btn btn-neutral'>All Purchase</Link>
    </div>
  )
}

export default AdminEntryPage