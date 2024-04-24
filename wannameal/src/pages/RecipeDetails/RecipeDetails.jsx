import React from 'react'
import style from './page.module.css';
import Food_Icon from '../../assets/fluent_food-24-filled.svg';
import dish from '../../assets/dish.png';
import { IoTime } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import MealCard from '../../components/mealCard/mealCard';
const RecipeDetails = () => {
    let x = [1, 23, 45, 68, 564, 6, 456, 44]
    return (
        <div className='p-md-5 mx-md-5 my-4'>
            <div className="row justify-content-between p-3">
                <div className="col-12 col-lg-5 d-flex flex-column gap-5 px-4 mb-5 mb-lg-0">
                    <h3 className={style.head_title}>The modus operandi of meat with potato and onion pieces</h3>
                    <div className={`d-flex  gap-5 align-items-center mt-3 ${style.customize} flex-wrap`}>
                        <div className="d-flex gap-2 ">
                            <img className={style.Food_Icon} src={Food_Icon} alt='icon' />
                            <div className="d-flex flex-column">
                                <p className='m-0 opacity-50'>apply for</p>
                                <span className='fw-bold fs-5 text-center'><big>2</big> people</span>
                            </div>
                        </div>
                        <button className='border-0 rounded-3 px-2 ' style={{ background: 'var(--green)', color: 'var(--text_white)', height: '3rem' }}>customize</button>
                    </div>
                    <svg className='ms-lg-4' xmlns="http://www.w3.org/2000/svg" width="350" height="2" viewBox="0 0 557 2" fill="none">
                        <path d="M1.5 1.00006L555.5 1.00001" stroke="#049601" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" />
                    </svg>
                    <div className="d-flex gap-3 flex-wrap">
                        <div className={`d-flex gap-2 align-items-center ${style.borderDash}`}>
                            <IoTime className={style.icon_details} />
                            <span className={style.icon_value}> <big className='fw-bold'>60</big> minutes</span>
                        </div>
                        <div className={`d-flex gap-2 align-items-center ${style.borderDash}`}>
                            <BsFire className={style.icon_details} />
                            <span className={style.icon_value}> <big className='fw-bold'>60</big> minutes</span>
                        </div>
                        <div className={`d-flex gap-2 align-items-center `}>
                            <GiCookingPot className={style.icon_details} />
                            <span className={style.icon_value}> <big className='fw-bold'>6</big> components</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <img style={{ width: '100%' }} src={dish} alt='dish' />
                </div>
            </div>
            <h2 className={style.divider_title}>ingredients</h2>
            <div className="row p-3">
                <div className="col-12 col-md-8 d-flex flex-column gap-5">
                    <div className={`d-flex justify-content-between ${style.ingredients}`}>
                        <p>meat</p>
                        <p className='opacity-50'>1/2 K</p>
                    </div>
                    <div className={`d-flex justify-content-between ${style.ingredients}`}>
                        <p>meat</p>
                        <p className='opacity-50'>1/2 K</p>
                    </div>
                    <div className={`d-flex justify-content-between ${style.ingredients}`}>
                        <p>meat</p>
                        <p className='opacity-50'>1/2 K</p>
                    </div>
                </div>
            </div>
            <h2 className={style.divider_title}>Directions</h2>
            <div className="row p-3">
                <div className="col-12 col-md-8 d-flex flex-column gap-4">
                    <div className={`d-flex justify-content-between align-items-center ${style.directionDiv}`}>
                        <span>1</span>
                        <p className='m-0'>قطع اللحم الي مكعبات متوسطه الحجم </p>
                    </div>
                    <div className={`d-flex justify-content-between align-items-center ${style.directionDiv}`}>
                        <span>2</span>
                        <p className='m-0'>ضع قطع اللحم في وعاء به ماء علي نار متوسطه وضع فيه البهارات (ملح - توابل لحم - فلفل اسود -ورق لوري )</p>
                    </div>
                    <div className={`d-flex justify-content-between align-items-center ${style.directionDiv}`}>
                        <span>3</span>
                        <p className='m-0'>عندما تنتهي البطاطس من الغليان اخرجها من الوعاء وقم بتقشيرها وقطعها اللي مكعبات متوسطه وقم برش بعض الملح والفلفل الاسود عليها </p>
                    </div>
                </div>
            </div>
            <h2 className={style.divider_title}>Latest Recipes</h2>
            <div className="row">
                {x.map((x) => {
                    return (
                        <div className="col d-flex justify-content-center">
                            <MealCard />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipeDetails