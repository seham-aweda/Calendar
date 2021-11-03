import React from "react";
import Board from "./board";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Calendar=()=>{
    const tim=new Date()
    const year = tim.getFullYear();
    const years = Array.from(new Array(20),( val, index) => index + year)
    const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
    const [SelectedMonth,setSelectedMonth]=React.useState(months[tim.getMonth()])
    const [SelectedYear,setSelectedYear]=React.useState(year)
    const [users,setUsers]=React.useState([])
    const [OneUser,setOneUser]=React.useState("")
    const [Password,setPassword]=React.useState("")
    const [TempUser,setTempUser]=React.useState("")
    const [FriendUser,setFriendUser]=React.useState("")
    const [CurrentID,setCurrentID]=React.useState("")
    const [FriendID,setFriendID]=React.useState("")
    const [ShowMe,setShowMe]=React.useState(true)
    React.useEffect(()=>{
        GetName()
    },[])


    const ChangeDate=(e)=>{
        setSelectedMonth(e.target.value)
    }
    const ChangeYear=(e)=>{
        setSelectedYear(e.target.value)
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
        let copyUsers=[...users]

        if(OneUser!=="" && Password!==""){

      let found=copyUsers.find(u=>{
          if(u.name===OneUser){
              return u
          }
      })
      console.log(found)
        // console.log(found===undefined)
        if(found!==undefined && found.password===Password){

            setTempUser(found.name)
            setCurrentID(found.id)
        }
        else  if(found!==undefined && found.password!==Password){
             toast('This UserName Already Exist,Check Your Password',{
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
             })
        }
        else if(found===undefined ){

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
            setShowMe(true)

        }}
        else{
            toast('Fill Out All The Fields',{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
 const LogOut=()=>{
        setTempUser("")
     setOneUser("")
     setPassword("")
     setShowMe(true)

 }

 const ChangeFriend=(e)=>{
     setShowMe(true)
        console.log(e.target.value)
             let friend = users.find(user => {
     if(e.target.value!='Any') {
                 if (user.name === e.target.value) {
                     return user
                 }
     }
             })
                 console.log(friend)
             setFriendID(friend.id)
         console.log(ShowMe)
             setShowMe(false)
         setFriendUser(friend.name)
 e.target.value='Any'
 }
 const Back=()=>{
     setShowMe(true)
     setFriendID('')
     setFriendUser('')

 }
    return (

        <div>
            {console.log(users)}
            {console.log(ShowMe)
            }            {TempUser === "" ?
                <>
                    <div style={{display:"flex"}}>
                    <div><img src={"https://www.pixelstalk.net/wp-content/uploads/images5/September-2021-Calendar-Wallpaper-HD.jpg"} width={"70%"} height={"70%"}/></div>
                    <div style={{margin:'auto'}}>
                <input type={"text"} placeholder={'UserName'} required value={OneUser} name={'OneUser'} onChange={OnChangeInput}/>
                <input type={"text"} placeholder={'PassWord'} required value={Password} name={'Password'} onChange={OnChangeInput}/>
                <input type={"button"} value={"Log In"} onClick={AddUser} className={'btn'}/>
                </div></div> </> :
                <>
            {console.log(tim.getMonth()+1)}
                    <div style={{display:"flex",justifyContent: 'space-around'}}>
                        <h3 style={{height:'fit-content',margin:'auto'}}>Welcome Back Dear {ShowMe?TempUser:FriendUser}</h3>
                        <button onClick={LogOut} style={{height:'fit-content',margin:'auto'}} className={'btn'}><span></span>Log Out</button>
                    </div>

                <select onChange={ChangeDate}>
                <option >Pick A Month</option>
            {months.map(u=>{
                if(u===months[tim.getMonth()])
                return <option key={u} defaultValue> {u}</option>
                else
                return <option key={u}>{u}</option>
            })}
                </select>
                    <select onChange={ChangeYear}>
                <option >Pick A Year</option>
            {years.map(u=>{
                if(u===year)
                return <option key={u} defaultValue> {u}</option>
                else
                return <option key={u}>{u}</option>
            })}
                </select>
                    <br/>
                    <div className={"main"}>
                        <div style={{display:"flex",backgroundColor:'lightgray'}}>
                        <hr style={{marginLeft:'20px',backgroundColor:'black'}}/>
                        <div><div>
                            <h1 style={{color:'#daa94a',padding:"10px"}}><p style={{color:'black'}}>{months.indexOf(SelectedMonth)+1}</p>{SelectedMonth}<p>{SelectedYear}</p></h1>
                          <h3>let's check some FRIENDS schedule</h3>
                            {ShowMe?<select onChange={ChangeFriend} style={{backgroundColor:'transparent',border:'none'}}>
                               <option>Any</option>
                                {users.map(user=>{
                                    if(user.name!==TempUser) {
                                        return <option id={user.id}
                                                       style={{backgroundColor: '#D3D3D3'}}>{user.name}</option>
                                    }})
                                }
                            </select>:""}
                            <input style={{backgroundColor: 'transparent',border:'none'}} type={"button"} value={"Back To Mine"} onClick={Back}/>
                        </div></div></div>
                        <div>
                            {ShowMe?
                                <Board IDS={CurrentID} month={months.indexOf(SelectedMonth) + 1} year={SelectedYear}/>
                               :""}
                            {!ShowMe ?
                                <Board IDS={FriendID} month={months.indexOf(SelectedMonth) + 1} year={SelectedYear}/>
                                    : "" }
                        </div> </div></> }
            <ToastContainer />
        </div>
    )
}
export default Calendar