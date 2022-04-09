import React, {useEffect, useState} from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import style from "./App.module.scss"
import Graph from "./Components/Graph";


function App() {
  //usestate new date default
  const [date, setDate] = useState(new Date(2021, 5, 1));

  //data counts
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(300)
  const [data, setData] = useState([])

  //get data from json
  useEffect(() => {
    axios.get("./P2VO.json")
      .then((data) => setData(data.data.slice(start, end)));
    }, []);
    

    //inc and dec handlers
    const dd = () => {
      setStart(prev => prev = prev - 30);
      setEnd(prev => prev = prev - 30);
    }

    ///console.log(data.length, start ,end)

  //open box module state
  const [dateGraphBox, setDateGraphBox] = useState(false)

  const handleDateGraph = () => {
    console.log("clicked")
    setDateGraphBox(prev => !prev)
  }


    return (<>
    <div className={style.App__dataIncbuttons}>
    <button 
    onClick={()=> {setStart(prev => prev = prev + 30); setEnd(prev => prev = prev + 30)}}>
      INC
    </button>
    <button onClick={()=> dd()}>
      DEC
    </button>
    </div>
    <div className={style.App}>
      <header className={style.app__header}>
        <Navbar handleDateGraph={handleDateGraph} length={data.length} date={date} setDate={setDate} />
      </header>
      <section className={style.app__graph_section}>
        <Graph open={dateGraphBox} setOpen={setDateGraphBox} handleDateGraph={handleDateGraph} date={date} data={data} />
      </section>
    </div>
    </>
  );
}

export default App;
