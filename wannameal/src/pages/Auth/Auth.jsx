import React, { useMemo } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import style from './auth.module.css';
import Account from './Account/Account';
import Forgot from './Forgot/Forgot';
import Verification from './Verification/Verification';
import Reset from './Reset/Reset';
import plate1 from "../../assets/plate_1.png"
import plate2 from "../../assets/plate_2.png"
import plate3 from "../../assets/plate_3.png"
export default function Auth() {

    return (
        <div className={style.thebody}>
            <Link to='/' className={style.logo}>Wanna Meal</Link>
            <div className={style.plate_1}>
                <img src={plate1} alt="plate" />
            </div>
            <div className={style.plate_2}>
                <img src={plate2} alt="plate" />
            </div>
            <div className={style.plate_3}>
                <img src={plate3} alt="plate" />
            </div>
            <Routes>
                <Route path='/' element={< Account />} />
                <Route path='/forgotPassword' element={<Forgot />} />
                <Route path='/verification' element={<Verification />} />
                <Route path='/reset' element={<Reset />} />
            </Routes>
        </div>
    )
}
