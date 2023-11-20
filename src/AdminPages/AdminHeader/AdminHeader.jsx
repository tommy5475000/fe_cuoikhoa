import React from 'react'
import style from './AdminHeaderStyle.module.scss'
import { Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import { useUserContext } from '../../context/UserContext';


export default function AdminHeader() {
    const { currentUser, handleSignout } = useUserContext()
  
    const handleSignoutSwal = () => {
        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: `Hủy`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Đã đăng xuất!', '', 'success')
                handleSignout()
            } else if (result.isDenied) {
                return
            }
        })
    }

    return (
        <div className={style.jss1}>
            <div style={{ display: 'flex' }}>
                <a className={style.jss2} lg="6" item="true">
                    <img src="./img/appleicon.png" className={style.jss3} />
                    <Typography
                        variant="h3"
                        sx={{ fontSize: 16, fontWeight: 500 }}>{currentUser.name}</Typography>
                </a>
                <a className={style.jss2} lg="6" item="true" onClick={handleSignoutSwal}>
                    <LogoutIcon className={style.jss3} />
                    <Typography
                        variant="h3"
                        sx={{ fontSize: 16, fontWeight: 500 }}>
                        <a>Đăng Xuất</a>
                    </Typography>
                </a>
            </div>

        </div>
    )
}
