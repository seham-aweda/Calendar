import React from "react";
import Board from "./board";
import axios from 'axios';

const Calendar=()=>{
    const tim=new Date()
    const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
    const [SelectedMonth,setSelectedMonth]=React.useState(months[tim.getMonth()]+" "+tim.getFullYear())
    const [users,setUsers]=React.useState([])
    const [OneUser,setOneUser]=React.useState("")
    const [Password,setPassword]=React.useState("")
    const [TempUser,setTempUser]=React.useState("")
    const [CurrentID,setCurrentID]=React.useState("")
    React.useEffect(()=>{
        GetName()
    },[])


    const ChangeDate=(e)=>{
        setSelectedMonth(e.target.value)
    }

    const GetName=async()=>{
        let result=await axios.get('https://617eae9a2ff7e600174bd8b5.mockapi.io/User')
        if(result.status === 200)
            setUsers(result.data)
    }

    const OnChangeInput=(e)=>{
        if(e.target.name === 'OneUser'){
                setOneUser(e.target.value)
        }
        else if(e.target.name === 'Password'){
                setPassword(e.target.value)
        }
    }
    const AddUser=async()=> {
        if(OneUser!=="" && Password!==""){
        let copyUsers=[...users]
      let found=copyUsers.find(u=>{
          if(u.name===OneUser && u.password===Password){
              return u
          }
      })
      console.log(found)
        // console.log(found===undefined)
        if(found!==undefined){
            setTempUser(found.name)
            setCurrentID(found.id)
        }
        else if(found===undefined){
            let NewUser={
                name:OneUser,
                password:Password,
            }
            let res=await axios.post("https://617eae9a2ff7e600174bd8b5.mockapi.io/User" ,NewUser)
            console.log(res)
            let copyUsers=[...users]
            copyUsers.push(res.data)
            setUsers(copyUsers)
            setTempUser(OneUser)
            setCurrentID(res.data.id)
            setOneUser("")
            setPassword("")
        }}
        else{
            alert('Fill Out All The Fields')
        }
    }
 const LogOut=()=>{
        setTempUser("")
     setOneUser("")
     setPassword("")
 }
    return (

        <div>
            {console.log(users)}
            {TempUser === "" ?
                <>
                <input type={"text"} placeholder={'UserName'} required value={OneUser} name={'OneUser'} onChange={OnChangeInput}/>
                <input type={"text"} placeholder={'PassWord'} required value={Password} name={'Password'} onChange={OnChangeInput}/>
                <input type={"button"} value={"Log In"} onClick={AddUser}/>
                </> :
                <>
            {console.log(tim.getMonth()+1)}
                    <div style={{display:"flex",justifyContent: 'space-around'}}>
                        <h3 style={{height:'fit-content',margin:'auto'}}>Welcome Back Dear {TempUser}</h3>
                        <button onClick={LogOut} style={{height:'fit-content',margin:'auto'}}><span></span>Log Out</button>
                    </div>
                    <br/>
                <select onChange={ChangeDate}>
                <option >Pick A Month</option>
            {months.map(u=>{
                if(u===months[tim.getMonth()])
                return <option key={u} defaultValue> {u+" "+tim.getFullYear()}</option>
                else
                return <option key={u}>{u+" "+tim.getFullYear()}</option>
            })}
                </select>
                <h1>{SelectedMonth}</h1>
                <Board IDS={CurrentID} month={months.indexOf(SelectedMonth.slice(0,SelectedMonth.length-5))+1} year={tim.getFullYear()}/>
                </> }
        </div>
    )
}
export default Calendar