import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import style from "./page.module.css";

export default function Verification() {
    const [code, setCode] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate()
    const handleChange = (e, index) => {
        const { value } = e.target;
        setCode(prevCode => {
            const newCode = [...prevCode];
            newCode[index] = value;
            return newCode;
        });
        if (value !== '') {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
        console.log(code);
    };
    const userToken = localStorage.getItem('userToken')
    let config = {
        headers: {
            token: userToken,
        },
    };
    const forgetCode = code.join('')
    const submitCode = (e) => {
        e.preventDefault();
        axios.patch('https://fast-plat1.vercel.app/auth/VerifyCode', { forgetCode }, config)
            .then((respo) => {
                console.log(respo.data);
                if (respo.data.success) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "please check your email - forward to reset password"
                    }).then(() => {
                        navigate('/auth/reset')
                    });
                }
            }).catch((err) => {
                console.log(err.response.data);
            })
    }
    return (
        <div >
            <form onSubmit={submitCode} className={style.contain}>
                <div className="d-flex align-items-center gap-2 flex-column justify-content-center w-75 text-center">
                    <h2>Please check your Email</h2>
                    <p className='text-black-50'>We have sent code to Badr23@gmail.com</p>
                </div>
                <div className={style['code-input']}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="tel"
                            maxLength="1"
                            value={digit}
                            onChange={e => handleChange(e, index)}
                            placeholder='_'
                            ref={ref => (inputRefs.current[index] = ref)}
                        />
                    ))}
                </div>
                <p className='text-black-50 fs-3'>send code again <span className='text-black-50 fs-5'>00:45</span></p>
                <button type='submit' className={style.button_submit}>Verification</button>
            </form>
        </div>
    )
}
