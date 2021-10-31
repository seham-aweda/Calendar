import React from 'react';

    const tim=new Date()
const Board = ({month=(Number(tim.getMonth())+1)}) =>{

    const squares=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    const[dat,setdat]=React.useState("")
            const start = new Date(`${month} 1, 2021`);
               console.log(start.getDay());
    //            const last=new Date(`November 30,2021`)
    // console.log(last.getDay())
    var d = new Date(2021, month, 0);
    console.log(d.getDate())
    const LastMon=squares.slice(0,start.getDay())
    const CurrMon=squares.slice(start.getDay(),start.getDay()+d.getDate())
    const NextMon=squares.slice(start.getDay()+d.getDate())

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
                {/*{squares.map((square) => {*/}
                {/*    return <div id={square} key={square}>{square}</div>*/}
                {/*})*/}

                {LastMon.map(u => {
                    return <div className={'square'} key={u} style={{}}>0</div>
                })}
                { CurrMon.map(u=>{
                    return <div className={'square'} key={u}>{u-(start.getDay()-1)}</div>
                })}
                {NextMon.map(u=>{
                    return <div className={'square'} key={u}>0</div>
                })




                }
            </div>
        </div>
    )
}
export default Board