import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from '../components/clientComponents/ClientHeader';

const ClientLayout = () => {

  return (
    <div>
        <ClientHeader />

        <Outlet />
    </div>
  )
}

export default ClientLayout