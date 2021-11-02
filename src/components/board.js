import React from 'react';
import axios from "axios";

const Board = ({month,year,IDS}) =>{
    const colors=['black','blueviolet','blue','aquamarine','brown','cadetblue','chartreuse','chocolate','coral','darkblue','darkorange','darkred','darksalmon','deeppink','fuchsia','gold','lightgreen','purple','teal']
    let RanIndex=Math.floor(Math.random()*colors.length)
    console.log('RanIndex',RanIndex)
    const squares=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    const [ClickedDate,setClickedDate]=React.useState("")
    const [showForm,setShowForm]=React.useState(false)
    const [Tasks,setTasks]=React.useState([])
    const [TempTask,setTempTask]=React.useState('')
    const [TempHour,setTempHour]=React.useState('')


    const start = new Date(`${month} 1, ${year}`);
         console.log(start.getDay());
    const d = new Date(year, month, 0);
         console.log(d.getDate())
    const LastMon=squares.slice(0,start.getDay())
    const CurrMon=squares.slice(start.getDay(),start.getDay()+d.getDate())
    const NextMon=squares.slice(start.getDay()+d.getDate())

    React.useEffect(()=>{
       GetTasks()
    },[])

    const GetTasks=async()=>{
        let result=await axios.get(`https://617eae9a2ff7e600174bd8b5.mockapi.io/User/`+IDS+`/Agenda`)
        if(result.status === 200)
            setTasks(result.data)
    }

    const ClickToShowForm=(e)=>{
             if(Number(e.target.textContent)<10){
                 setClickedDate('0'+e.target.textContent)
             }else{
        setClickedDate(e.target.textContent)
             }
        setShowForm(true)
    }

    const TaskInput=(e)=>{
        if(e.target.name==='sub'){
            setTempTask(e.target.value)
        }
        if(e.target.name==='appointment'){
            setTempHour(e.target.value)
        }
    }

    const AddTask=async()=>{
        if(TempTask === "" && TempHour === ""){
            alert('Fill it or press cancel')}
        else{
            let NewTask={
                taskTitle:TempTask,
                time:TempHour,
                day:ClickedDate
            }
            let res=await axios.post(`https://617eae9a2ff7e600174bd8b5.mockapi.io/User/`+IDS+`/Agenda` ,NewTask)
            let copyTask=[...Tasks]
            copyTask.push(res.data)
            setTasks(copyTask)
            setClickedDate('')
            setShowForm(false)
            setTempTask('')
            setTempHour('')
        }
    }


    return (
        <div>
            <div className={"grid"}>
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>

                {LastMon.map(u => {
                    return <div className={'square'} key={u} style={{opacity:"0.5"}}></div>
                })}
                { CurrMon.map(u=>{
                    return <div onClick={ClickToShowForm} id={u-(start.getDay()-1)} className={'square'} key={u}>{u-(start.getDay()-1)}
                        {Tasks.length===0?"":Tasks.map(t=>{
                            if(t.day===(u-(start.getDay()-1))){
                            return <span style={{border:'1px solid black',borderRadius:'50%',backgroundColor:`${colors[RanIndex]}`,width:"10px",height:"10px"}}></span>
                        }})}
                    </div>
                })}
                {NextMon.map(u=>{
                    return <div className={'square'} key={u} style={{opacity:"0.5"}}></div>
                })}
            </div>
            {showForm ?
                <div>
                    {console.log(ClickedDate)}
                    <br/>
                    <label>Date:
                        <input readOnly type="date" name="date"  value={`${year}-${month}-${ClickedDate}`}  min={`${year}-${month}-${ClickedDate}`} max={`${year}-${month}-${ClickedDate}`}/></label>
                    <br/>
                    <label>Sub:
                        <input type="text" name="sub" required onChange={TaskInput}/></label>
                    <br/>
                    <label htmlFor="appointment">Choose an appointment time: </label>
                    <input id="appointment" type="time" name="appointment" onChange={TaskInput} />
                    <br/>
                    <input type={"button"} value={"ADD"} onClick={AddTask}/>

                </div>:"Click on the day to add your appointment"}
        </div>
    )
}
export default Board