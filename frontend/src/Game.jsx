import Monument from "./assets/monument1.jpg"
import { useState, useEffect, Component } from 'react';
import Hint from "./Hint"
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3000");

function Game({setView, socket, targetLocation, hintsList, updateHintsList}) {

    // var [direction, setDirection] = useState("Loading...");
class App extends Component{
    fileSelectedHandler = event =>{
        console.log(event);
    }
}


    const [file, setFile] = useState();

    var dataToSend = {};
    dataToSend['LatiPosition'] = 0;
    dataToSend['LongPosition'] = 0;
    dataToSend['desiredLat'] = targetLocation.lat;
    dataToSend['desiredLon'] = targetLocation.lon;
    dataToSend['userName'] = "test";

    function addHint(text){
        updateHintsList([...hintsList, <Hint text={text} key={hintsList.length}/>]);
    }

    console.log(hintsList);

    function updatePositionsNow(position)
    {
            dataToSend['LatiPosition'] = position.coords.latitude;
            dataToSend['LongPosition'] = position.coords.longitude;
    }


    // useEffect(() => {
    //     createAndSendData();
    //     const interval = setInterval(() => {
    //         createAndSendData();
    //     }, 10000);
      
    //     return () => {
    //       clearInterval(interval);
    //     };
    // }, []); // has no dependency - this will be called on-component-mount

    var hintsToDisplay = hintsList;
    if (hintsList.length > 3){
        hintsToDisplay = hintsList.slice(Math.max(hintsList.length - 3, 0))
    }
    return (
        <div className="bg-slate-800 bg-cover flex flex-col items-center justify-center h-[calc(100vh-5rem)] pb-10 lg:h-auto lg:justify-normal lg:pt-10">
            <div className="text-4xl font-bold text-white">Current Target</div>
            {/* <div className="text-xl pt-2 font-bold text-white">{direction}</div> */}
            <div className="w-9/12 pt-4 flex">
                <img src={Monument} className="pt-4 w-full"/>
            </div>




                <input type="file" onChange={this.fileSelectedHandler}/>




            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12 lg:mb-20" onClick={()=>{
                navigator.geolocation.watchPosition(updatePositionsNow);

                // Emit the data!
                socket.emit("requestData", dataToSend);
        
                socket.on("returnedData", (args) => {
                    addHint("The target is " + args + " from your current location");
                })

            }}>
                Hint
            </button>
            {hintsList.length ? <div className="pt-5">{hintsToDisplay}</div> : null}

        </div>
    )
}

export default Game
