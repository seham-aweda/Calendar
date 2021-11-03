import React from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Board = ({month,year,IDS}) =>{
    const squares=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    const [ClickedDate,setClickedDate]=React.useState("")
    const [showForm,setShowForm]=React.useState(false)
    const [Tasks,setTasks]=React.useState([])
    const [TempTask,setTempTask]=React.useState('')
    const [TempHour,setTempHour]=React.useState('')
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [updateId, setUpdateId] = React.useState(-1)


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

    const ClickToShowForm=(e)=> {
        setShowForm(false)
        if (month < (new Date().getMonth())+1) {
                toast('It\'s Too Late, You Can\'t Go Back In Time',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        // if(e.target.id < (new Date().getDay())){
        //         toast('It\'s Too Late, You Can\'t Go Back In Time')
        // }

        else {
            if (Number(e.target.id) < 10) {
                setClickedDate('0' + e.target.id)
            } else {
                setClickedDate(e.target.id)
            }
            setShowForm(true)
        }
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
            toast('Fill it or press cancel',{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        else{
            let NewTask={
                taskTitle:TempTask,
                time:TempHour,
                day:ClickedDate,
                month:month,
                year:year
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
    const Cancel=()=>{
        setClickedDate('')
        setShowForm(false)
        setIsUpdate(false)
        setTempTask('')
        setTempHour('')
    }
    const DeleteTask=async(val)=>{
             let res=await axios.delete(`https://617eae9a2ff7e600174bd8b5.mockapi.io/User/`+IDS+`/Agenda`+`/`+val)
        setShowForm(false)
        if(res.status===200){
        let copyTasks=[...Tasks]
        let result=copyTasks.filter((task)=>{
            if(task.id!==val)
                return task
        })
        setTasks(result)
       }}

    const EditTask=(id)=>{
        setIsUpdate(true);
        let t = Tasks.find(value => {
            return value.id === id
        })
        setTempTask(t.taskTitle)
        setTempHour(t.time)
        setClickedDate(t.day)
        setUpdateId(t.id);
        console.log('ffff',ClickedDate)
         }

    const updateNewTaskHandler = async () => {
        let response = await axios.put(`https://617eae9a2ff7e600174bd8b5.mockapi.io/User/`+IDS+`/Agenda`+`/`+updateId,{
            taskTitle : TempTask,
            time:TempHour,
        })
        if(response.status === 200){
            const TasksList = [...Tasks];
            let tas = TasksList.find(value => {
                return value.id === updateId
            })
            tas.taskTitle =TempTask
            tas.time=TempHour

            setTasks(TasksList)
        }
        console.log("response :",response)
        setShowForm(false)
        setIsUpdate(false)
        setTempTask("")
        setTempHour('')
    }
    return (
        <div>
            {console.log(Tasks)}
            <div className={"grid"}>
                <div className={"header"}>Sunday</div>
                <div className={"header"}>Monday</div>
                <div className={"header"}>Tuesday</div>
                <div className={"header"}>Wednesday</div>
                <div className={"header"}>Thursday</div>
                <div className={"header"}>Friday</div>
                <div className={"header"}>Saturday</div>

                {LastMon.map(u => {
                    return <div className={'square'} key={u} style={{opacity:"0.5"}}></div>
                })}
                { CurrMon.map(u=>{return <div onClick={ClickToShowForm} id={u-(start.getDay()-1)} className={'square'} key={u}>{u-(start.getDay()-1)}
                        {Tasks.length===0?"":Tasks.map(t=>{
                            if(t.day==(u-(start.getDay()-1))&& t.month==month && t.year==year){
                            return <span  className={'tooltip'} style={{width:'fit-content',border:`0.5rem solid ${t.color}`,borderRadius:'100%',margin:"3px"}}>
                                <span  className={"tooltiptext"} id={t.day} ><span onClick={()=>{EditTask(t.id)}}><svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="20" height="20" fill="currentColor"
                                                                             className="bi bi-pencil-square"
                                                                             viewBox="0 0 16 16">
  <path
      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>    </span><span onClick={()=>{DeleteTask(t.id)}}><svg
                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    className="bi bi-eraser-fill" viewBox="0 0 16 16">
  <path
      d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
</svg>  </span>  {t.taskTitle} at {t.time} </span></span>
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
                    {!isUpdate?
                    <label>Date :
                        <input readOnly type="date" name="date"  value={`${year}-${month}-${ClickedDate}`}  min={`${year}-${month}-${ClickedDate}`} max={`${year}-${month}-${ClickedDate}`}/></label>
                    :""}
                        <br/>
                    <label>Sub :
                        <input type="text" name="sub" value={TempTask} required onChange={TaskInput}/></label>
                    <br/>
                    <label htmlFor="appointment">Choose an appointment time :  </label>
                    <input id="appointment" type="time" value={TempHour} name="appointment" onChange={TaskInput} />
                    <br/>
                    {!isUpdate?
                    <input type={"button"} value={"ADD"} onClick={AddTask} className={'add'}/>:''}
                    {isUpdate?
                    <input type={"button"} value={"Update"} onClick={updateNewTaskHandler} className={'add'}/>:''}
                    <input type={"button"} value={"Cancel"} onClick={Cancel} className={'add'}/>

                </div>:"Click on the day to add your appointment"}

        </div>
    )
}
export default Board