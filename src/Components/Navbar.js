import React, {useState} from 'react'
import style from "./Navbar.module.scss"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calender.scss"
import { DecadeView } from 'react-calendar';

export default function Navbar({handleDateGraph , length, date, setDate}) {
  
  //get month using getmonth method value
  const months = ['jan', 'feb', 'march', 'april', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']
  let month = months.map((i, index) => date.getMonth() === index && i.toLocaleUpperCase() )
  
  return (
    <>
    <nav className={style.nav__container}>
        <Calendar 
        onChange={setDate} 
        value={date} 
        defaultView="decade"
        minDate={new Date(2021, 1, 1)}
        maxDate={new Date(2022, 1, 1)} />

        <div className={style.nav__selected__date}>
          <p>Showing graph for {month} {date.getFullYear()}</p>
            <button onClick={() => handleDateGraph()}><p>{date.getDate()} {month} {date.getFullYear()}</p></button>
            <p>data count: {length}</p>
        </div>
    </nav>
    </>
  )
}
