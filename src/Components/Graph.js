import React, { useState } from 'react'
import style from "./Graph.module.scss"
import {Chart} from "react-google-charts"
import { motion } from 'framer-motion'

export default function Graph({open, setOpen, handleDataGraph, date, data}) {
   //sheduled dates 
   const sheduledDates = data.map(i => {
      let newDate = new Date(i.schedule_time)
      return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
      //return newDate
   })

  //console.log(data)
   const selectedNewDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
   //console.log()

  //find similer shedules 
  const similerSheduleDate = sheduledDates.filter( i => 
   i === selectedNewDate
  )
   //filter data an data and get the matched data with the current selected data 
   const filterDataForCurrentDate =data.filter( i =>
      {
         let newDate = new Date(i.schedule_time)
         let nnd = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
         return nnd === selectedNewDate
      }
   )

   //Lunch , Dinner data current date
   const fdfcdLunch = filterDataForCurrentDate.filter(i => i.slot==="L")
   const fdfcdDinner = filterDataForCurrentDate.filter(i => i.slot==="D")
// console.log("Date ld:" , fdfcdLunch, fdfcdDinner)
console.log("filter",filterDataForCurrentDate)
// console.log("sss",similerSheduleDate)
// date section 
// const [hr, setHr] = useState(0)
// const [min, setMin] = useState(0)

const timeData = filterDataForCurrentDate.map(i => {
   let newDate = new Date(i.schedule_time)
   let timehr = newDate.getHours()
   let timemin = newDate.getMinutes()
   //console.log(`${timehr}:${timemin}`)
   let fullTimeNt = timehr >= 9 && timehr <= 12 && `${timehr}:${timemin}`

   let fullTimeTO = timehr >= 12 && timehr <= 13 && `${timehr}:${timemin}`

   let fullTimeOf = timehr >= 13 && timehr <= 16 && `${timehr}:${timemin}`

   let fullTimeFn = timehr >= 16 && timehr <= 19 && `${timehr}:${timemin}`

   let fullTimeNtt = timehr >= 19 && timehr <= 23 && `${timehr}:${timemin}`
   console.log("dd", fullTimeNt.length)

   return {
      nt: fullTimeNt,
      to:fullTimeTO,
      of: fullTimeOf,
      fn: fullTimeFn,
      ntt: fullTimeNtt
   }

})
//console.log('time',timeData )
const nt = timeData.filter( i => i.nt != false)
const to = timeData.filter( i => i.to != false)
const of = timeData.filter( i => i.of != false)
const fn = timeData.filter( i => i.fn != false)
const ntt = timeData.filter( i => i.ntt != false)

//console.log(nt,to, of, fn,ntt)

const filterDataForCurrentMonth = data.filter( i =>
   {
      let newDate = new Date(i.schedule_time)
      return (newDate.getMonth() === date.getMonth() && newDate.getFullYear() === date.getFullYear())
   }
)
//Lunch / Dinner data for month /year
const fdfcmLunch = filterDataForCurrentMonth.filter( i => i.slot === "L")
const fdfcmDinner = filterDataForCurrentMonth.filter( i => i.slot === "D")
//console.log("l:", fdfcmLunch.length, "d", fdfcmDinner.length)



   //setchart data
   const cd = [
      [
      { type: "date", label: "Date" },
      "Lunch",
      "Dinner",
    ]
   ]

   filterDataForCurrentMonth.map(i => {
      let yearcm;
      let monthcm;
      let datecm;
      yearcm = i.schedule_time.slice(0, 4)
      monthcm = i.schedule_time.slice(5, 7)
      datecm = i.schedule_time.slice(8, 10)
      let newDate = new Date(i.schedule_time)
      let hrcm = newDate.getHours()
      let mincm = newDate.getMinutes()
      //console.log(hrcm, mincm)
      //console.log(year, month, date)
      let cdate = filterDataForCurrentMonth.filter( i => parseInt(datecm) === new Date(i.schedule_time).getDate())
      //console.log(cdate)
      let cdatel = cdate.filter(i => i.slot ==="L")
      let cdated = cdate.filter( i => i.slot ==="D")

      cd.push([new Date(yearcm, monthcm, datecm, hrcm, mincm), cdatel.length, cdated.length])

   })
   //console.log(cd)


    
   const options = {
      chart: {
        title: " customer scheduling patterns",
        subtitle: "Dates, Shedules",
      },
   };
    


  return (<>
    <div className={style.graph__container}>
      <Chart className={style.chart}
      chartType="Line"
      width="100%"
      height="100%"
      data={cd}
      options={options}
    />
    </div>
    <motion.section 
    initial={{opacity:0}}
    animate={open? {opacity:1}:{ display:"none"}}
    className={` ${style.date__graph}`}>
      <motion.div animate={open? {x:0}:{x:"-100vw"}}>
         <div>
            <p>9am - 12pm</p>
            <div>
              <p>{nt.length} Shedules</p>
            </div>
         </div>
         <div>
            <p>12pm - 13pm</p>
            <div>
           <p>{to.length} Shedules</p>
            </div>
         </div>
         <div>
            <p>13pm - 16pm</p>
            <div>
           <p>{of.length} Shedules</p>
            </div>
         </div>
         <div>
            <p>16pm - 19pm</p>
            <div>
           <p>{fn.length} Shedules</p>
            </div>
         </div>
         <div>
            <p>9pm - 12am</p>
            <div>
            <p>{ntt.length} Shedules</p>
            </div>
         </div>
      </motion.div>
    </motion.section>
    </>
  )
}
