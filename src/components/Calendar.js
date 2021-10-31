import React from "react";
import Board from "./board";

const Calendar=()=>{
    const tim=new Date()
    const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
    const [SelectedMonth,setSelectedMonth]=React.useState(months[tim.getMonth()]+" "+tim.getFullYear())

    const ChangeDate=(e)=>{
        setSelectedMonth(e.target.value)
    }
    return (
        <div>
            {console.log(tim.getMonth()+1)}
            <select onChange={ChangeDate}>
                {months.map(u=>{
                    if(u===months[tim.getMonth()])
                        return <option selected> {u+" "+tim.getFullYear()}</option>
                    else
                        return <option>{u+" "+tim.getFullYear()}</option>
            })}
            </select>
            <h1>{SelectedMonth}</h1>
            <Board month={months.indexOf(SelectedMonth.slice(0,SelectedMonth.length-5))+1}/>

        </div>
    )
}
export default Calendar