import React from 'react'
import { Link } from 'react-router-dom'

const AdminSupplierPage = () => {
  return (
    <div className='m-5 gap-5 flex'>
        <Link to={'/admin/supplier/create-supplier'} className='btn'>Create Supplier</Link>
        <Link to={'/admin/supplier/all-supplier'} className='btn'>All Supplier</Link>
    </div>
  )
}

export default AdminSupplierPage