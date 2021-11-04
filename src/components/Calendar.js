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
    const [isPass, setIsPass] = React.useState(false)

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
            toast(`Welcome ${OneUser}`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
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
    let type = isPass ? "text" : "password"

    const EyeFunction = () => {
        setIsPass(!isPass)
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
                    <div style={{position:'relative',zIndex:"0",height:"100vh",opacity:"0.3",background:`url(https://store-images.s-microsoft.com/image/apps.16701.9007199266367162.b3a5cd49-f0ff-4c9e-9b60-6eab5f68ffb9.452b9584-0a1c-42cb-a2eb-8de6664aa9eb?mode=scale&q=90&h=720&w=1280) center/cover no-repeat `}}>
                    </div>
                    <div style={{zoom:'130%',position:'fixed',zIndex:"1",top:'30%',left:'45%',height:'100%',margin:'auto',fontSize:'25px'}}>
               <div> <input type={"text"}  placeholder={'UserName'} required value={OneUser} name={'OneUser'} onChange={OnChangeInput}/></div>
              <div>  <input type={type} placeholder={'PassWord'} required value={Password} name={'Password'} onChange={OnChangeInput}/>{isPass ? <span onClick={EyeFunction}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                                                                                                                                        fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg> </span> : <span onClick={EyeFunction}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                              className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                <path
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg> </span>
              }</div>
                <input type={"button"} value={"Log In"} onClick={AddUser} className={'btn'}/>
                </div> </> :
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