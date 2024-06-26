import { useState, useEffect } from 'react';
import Hint from "./Hint"
import Modal from "./Modal"

function Game({setView, setPlaying, socket, targetLocation, hintsList, updateHintsList, getNewTarget}) {
    // var [direction, setDirection] = useState("Loading...");
    var [location, setLocation] = useState({"lat": 0, "lon": 0});
<<<<<<< HEAD
    var [showModal, toggleModal] = useState(false);
=======

>>>>>>> refs/remotes/origin/main
    var dataToSend = {};
    dataToSend['desiredLat'] = targetLocation.lat;
    dataToSend['desiredLon'] = targetLocation.lon;
    dataToSend['userName'] = "test";
    function addHint(text){
        updateHintsList([...hintsList, <Hint text={(hintsList.length+1) + ": " + text} key={hintsList.length}/>]);
    }

    // console.log(hintsList);

    function updatePositionsNow(position)
    {
<<<<<<< HEAD
        dataToSend['LatiPosition'] = position.coords.latitude;
        dataToSend['LongPosition'] = position.coords.longitude;
    }
    
    // dataToSend['LatiPosition'] = location.lat;
    // dataToSend['LongPosition'] = location.lon;
=======
            setLocation({"lat": position.coords.latitude, "lon": position.coords.longitude});
    }
    
    dataToSend['LatiPosition'] = location.lat;
    dataToSend['LongPosition'] = location.lon;
>>>>>>> refs/remotes/origin/main

    navigator.geolocation.watchPosition(updatePositionsNow);

    useEffect(() => {
        const interval = setInterval(() => {
            navigator.geolocation.watchPosition(updatePositionsNow);
        }, 10000);
      
        return () => {
          clearInterval(interval);
        };
    }, []); // has no dependency - this will be called on-component-mount
<<<<<<< HEAD
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
=======
>>>>>>> refs/remotes/origin/main

    var hintsToDisplay = hintsList;
    if (hintsList.length > 3){
        hintsToDisplay = hintsList.slice(Math.max(hintsList.length - 3, 0))
    }
    return (
        <div className="bg-slate-800 bg-cover flex flex-col items-center justify-center h-[calc(100vh-5rem)] pb-5 lg:h-auto lg:justify-normal lg:pt-10">
            <div className="text-4xl font-bold text-white">Current Target</div>
            {/* <div className="text-xl pt-2 font-bold text-white">{direction}</div> */}
            <div className="w-9/12 pt-4 flex">
                <img src={"http://localhost:3000/static/" + targetLocation.name.replaceAll(" ", "").replaceAll(".", "") + ".jpg"} className="pt-4 w-full max-h-1/2"/>
            </div>

            {showModal && <Modal getNewTarget={getNewTarget} setPlaying={setPlaying} toggleModal={toggleModal} setView={setView}/>}

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12 relative">
                <form>
                    <input
                        type="file"
                        name="myImage"
                        className="text-center opacity-0 absolute top-0 bottom-0 left-0 right-0 m-auto z-50"
                        accept="image/*"
                        onChange={async (event) => {
                            console.log(event.target.files[0]);
                            if (event.target.files[0]){
                                setPlaying(false);
                                updateHintsList([]);
                                let formData = new FormData()
                                toggleModal(true);
                                formData.append('file', event.target.files[0])
                                const response = await fetch('http://localhost:3000/image', {
                                    method: 'POST',
                                    body: formData,
                                })
                                socket.emit("uploadPicture", targetLocation.name, event.target.files[0].name);
                                if (response){
                                    console.log(response);
                                }
                            }
                            
                        }}
                    />
                </form>
                
                <div className="flex flex-col justify-center itemes-center absolute top-0 bottom-0 left-0 right-0 m-auto text-white h-12 w-9/12s" >
                    <div>Submit Image</div>
                </div>
            </button>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12" onClick={()=>{
                // navigator.geolocation.watchPosition(updatePositionsNow);
                console.log('Clicked');
                navigator.geolocation.getCurrentPosition((position) => {
                    dataToSend['LatiPosition'] = position.coords.latitude;
                    dataToSend['LongPosition'] = position.coords.longitude;
                    console.log('Here is my position after promise: ', position);
                })
                // Emit the data!
                sleep(500).then(() => {
                    console.log('DatatoSend=', dataToSend);
                    socket.emit("requestData", dataToSend);
                    
                    socket.on("returnedData", (args) => {
                        addHint("The target is " + args + " from your current location");
                    })
                })
            }}>
                Hint
            </button>
            {hintsList.length ? <div className="pt-2 flex flex-col justify-center items-center">{hintsToDisplay}</div> : null}
        </div>
    )
}
export default Game