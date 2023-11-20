import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../../AdminNavBar/AdminNavBar'
import AdminHeader from '../../AdminHeader/AdminHeader'

export default function AdminLayout() {
  return (
    <div style={{ position: 'relative' }}>
    <AdminNavBar />
    <div>
        <AdminHeader />
        <Outlet />
    </div>

</div>
  )
}
