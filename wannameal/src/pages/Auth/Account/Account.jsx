import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineMailOutline, MdPassword, MdStar } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
import style from '../auth.module.css';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';
import { registerUser } from '../../../redux/slices/registerSlice';
import Swal from 'sweetalert2';
export default function Account() {
    const [logappear, setlogappear] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [miniNumber, setminiNumber] = useState(false)
    const [hasNumber, sethasNumber] = useState(false)
    const [lowerUpper, setlowerUpper] = useState(false)
    let handleLoginChange = (e) => {
        const { name, value } = e.target;
        setUser((old) => ({
            ...old,
            [name]: value,
        }));
        console.log(user);
    };
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;

        if (name === "password") {
            const hasMinimumLength = value.length >= 8;
            const hasNumber = /\d/.test(value);
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);

            setminiNumber(hasMinimumLength);
            sethasNumber(hasNumber);
            setlowerUpper(hasUppercase && hasLowercase);
        }

        setUserData((old) => ({
            ...old,
            [name]: value,
        }));
        console.log(userData);
        console.log(hasNumber, lowerUpper, miniNumber);
    };

    const submitLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(user))
            // add the sweetalert 
            .then((action) => {
                if (loginUser.fulfilled.match(action)) {
                    // Check the state of the error
                    if (action.payload.error) {
                        console.error("Login failed:", action.payload.error);
                    } else {
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
                            title: "Signed in successfully"
                        }).then(() => {
                            navigate('/')
                        });
                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "invalid email or password"
                    })
                }
            });
    };
    const submitRegiser = (e) => {
        e.preventDefault();
        dispatch(registerUser(userData))
            // edit the sweetalert 
            .then((action) => {
                if (registerUser.fulfilled.match(action)) {
                    if (action.payload.error) {
                        console.error("Login failed:", action.payload.error);
                    } else {
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
                            title: "Signed up successfully"
                        }).then(() => {
                            setlogappear(true)
                        });
                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "unaccepted data"
                    })
                }
            });
    };
    return (
        <div>
            {/* start login component  */}
            <form method="get" className={`${style.form} ${logappear ? style.login_animation : ''}`} onSubmit={submitLogin}>
                <p className={style.head}>Login</p>
                <div className="d-flex flex-column gap-4 my-3">
                    <div className={style.inputForm}>
                        <MdOutlineMailOutline size={20} />
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleLoginChange}
                            className={style.input}
                            placeholder="Enter your Email" />
                    </div>
                    <div className={style.inputForm}>
                        <MdPassword size={20} />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleLoginChange}
                            className={style.input}
                            placeholder="Enter your Password"
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" className={style.check} />
                        <label className={style.typo}>Remember me </label>
                    </div>
                    <Link className={style.typo} to={'/auth/forgotPassword'}><span >Forgot password?</span></Link>
                </div>
                <button className={style.button_submit}>Log In</button>
                <p className={style.p}>Or With</p>
                <div className={style.flex_row}>
                    <button className={style.btn}>
                        <FcGoogle size={35} />
                        Google
                    </button>
                    <p className={style.p}>
                        Don't have an account? <span onClick={() => setlogappear(!logappear)} className={style.span}>Sign Up</span>
                    </p>
                </div>
            </form>
            {/* end login component  */}
            {/* start sign up component  */}
            <div>
                <form method="get" onSubmit={submitRegiser} className={`${style.form_register}  ${!logappear ? style.signup_animation : ''}`}>
                    <div className="d-flex flex-column gap-4 my-3">
                        <div className={style.inputForm}>
                            <FaUser size={20} />
                            <input
                                type="text"
                                className={style.input}
                                id="userName"
                                name="userName"
                                placeholder="Name"
                                value={userData.userName}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className={style.inputForm}>
                            <MdOutlineMailOutline size={20} />
                            <input
                                type="text"
                                name="email"
                                value={userData.email}
                                onChange={handleRegisterChange}
                                className={style.input}
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className={style.inputForm}>
                            <MdPassword size={20} />
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleRegisterChange}
                                className={style.input}
                                placeholder="Enter your Password"
                            />
                        </div>
                        <div className={style.inputForm}>
                            <MdPassword size={20} />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleRegisterChange}
                                className={style.input}
                                placeholder="confirm your Password"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <div className={`d-flex gap-2 align-items-center ${miniNumber ? style.green : style.red}`}>
                            <IoCheckmarkCircle size={20} />
                            <p className="m-0">At least 8 characters</p>
                        </div>
                        <div className={`d-flex gap-2 align-items-center ${hasNumber ? style.green : style.red}`}>
                            <IoCheckmarkCircle size={20} />
                            <p className="m-0">At least 1 number</p>
                        </div>
                        <div className={`d-flex gap-2 align-items-center ${lowerUpper ? style.green : style.red}`}>
                            <IoCheckmarkCircle size={20} />
                            <p className="m-0">Bath upper and lower case letters</p>
                        </div>
                    </div>
                    <button type="submit" className={style.button_submit}>sign In</button>
                    <p className={style.p}>Or With</p>
                    <div className={style.flex_row}>
                        <Link href={'https://fast-plat1.vercel.app/auth/login/success'} className={style.btn}>
                            <FcGoogle size={35} />
                            Google
                        </Link>
                        <p className={style.p}>
                            have an account? <span onClick={() => setlogappear(!logappear)} className={style.span}>log in</span>
                        </p>
                    </div>
                </form>
                <div className={`${style.register_content} ${!logappear ? style.full_opacity : ''}`}>
                    <h1>Create Account</h1>
                    <h3 className="mb-5">What you will get? </h3>
                    <div className="d-flex flex-column gap-5">
                        <div className="d-flex gap-2">
                            <MdStar color='#FFC107' size={25} />
                            <p className="m-0">Manage your recipes the easy way</p>
                        </div>
                        <div className="d-flex gap-2">
                            <MdStar color='#FFC107' size={25} />
                            <p className="m-0">Share recipes with your friends and discover new ones.</p>
                        </div>
                        <div className="d-flex gap-2">
                            <MdStar color='#FFC107' size={25} />
                            <p className="m-0">Organize recipes by tag, share it with your friends</p>
                        </div>
                        <div className="d-flex gap-2 ">
                            <MdStar color='#FFC107' size={25} />
                            <p className="m-0">
                                Know the parts of the meal and what it consists of and the
                                components that each molecule contains.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* end sign up component  */}
        </div>
    )
}
