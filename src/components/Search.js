import axios from "axios";
import React, { useEffect, useState } from 'react';
import {useRef} from 'react';
import notfoundIMG from './urban-line-305.gif';
import right from './right-arrow.png'

const Search = () =>{
    const tvalue = useRef(null);
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    const options = {
    method: 'POST',
    url: 'https://trains.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '193054a8e1msh54b91652feb3e3ap1e1bf8jsnad84dc5f1426',
        'X-RapidAPI-Host': 'trains.p.rapidapi.com'
    },
    data: {"search" : `${value}`}
    };

    useEffect(_ =>{
          axios.request(options).then(function (response) {
            setData(response.data)
          }).catch(function (error) {
              console.error(error);
          });
    },[value]);

    const onSubmit = event => {
          event.preventDefault();
          setValue(tvalue.current.value);
    }
    const keyDownHandler = event => {
        if(event.key==='Enter'){
            event.preventDefault();
            setValue(tvalue.current.value);
        }
    }
    return(
        <div className="Search">
            <div className="searchsec">
                <div className="inputSec">
                    <input type={'text'} ref={tvalue} onKeyDown={keyDownHandler} placeholder="Train Name"/>
                    <button type="submit" onClick={onSubmit}>Search</button>
                </div>
            </div>
            <div className="aboutTrainCard">
                { value.length>0?(
                    (data.length)!==0?(data.map((value,idx)=>{
                        return(
                        <div key={idx} className="cart">
                            <div className="DetailsCard">
                                <div>
                                    <span className="name">{value.name}</span>
                                    <p>{('00000'+ value.train_num).slice(-5)}</p>
                                </div>
                                <div className="daysClass">
                                    <p>
                                        <span style={value.data.days.Sun===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Sun==="0" ? "Sun":"Sun"}</span>
                                        <span style={value.data.days.Mon===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Mon==="0" ? "Mon":"Mon"}</span>
                                        <span style={value.data.days.Tue===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Tue==="0" ? "Tue":"Tue"}</span>
                                        <span style={value.data.days.Wed===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Wed==="0" ? "Wed":"Wed"}</span>
                                        <span style={value.data.days.Thu===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Thu==="0" ? "Thu":"Thu"}</span>
                                        <span style={value.data.days.Fri===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Fri==="0" ? "Fri":"Fri"}</span>
                                        <span style={value.data.days.Sat===1?{backgroundColor: "green",color:"white"}:{backgroundColor: "red",color:"white"}}>{value.data.days.Sat==="0" ? "Sat":"Sat"}</span>
                                    </p><br/>
                                    <p>
                                        {
                                            value.data.classes !=="Unreserved" ? (value.data.classes).map((cdata,idx) =>{
                                                return(
                                                    <span key={idx}>{cdata.toString()}</span>
                                                )
                                            }):("")
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="DetailsTime">
                                <span>
                                    <p>{value.train_from}</p>
                                    <p>{value.data.departTime}</p>
                                    <p>Depart Time</p>
                                </span>
                                <img className="to" src={right} alt="to"/>
                                <span>
                                    <p>{value.train_to}</p>
                                    <p>{value.data.arriveTime}</p>
                                    <p>ArriveTime</p>
                                </span>
                            </div>
                        </div>
                        )
                    })):(
                        <div className="notFound">
                        <p>Please Enter Valid Input</p>
                        <img src={notfoundIMG} alt="404"/>
                        </div>
                    )):("")
                }
            </div>

            <div className="aboutTrain">
                <p>Gaamini</p><br/>
                <p>Gaamini FAQs</p>&nbsp;
                <p>What is Gaamini?</p>
                <p>Gaamini is the one-stop solution for all train-related queries, for the users who love to travel across India by train. One can search for train running between stations to get to know available unreserved seats and the schedule of that trains, which helps passengers in planning their journey more efficiently. Gaamini predicts the chance of confirmation of your waitlisted ticket based on the previous history. These are a few services which we have put forth, there are a lot more to go. Gaamini is equipped with all the train enquiry services and data that travelers needed; it helps them with the information they are looking for.</p>&nbsp;
                <p>What are services offered by Gaamini?</p>
                <p>Services offered by Gaamini are PNR status, Search Train, Add Later =&gt; live train status, seat availability, trains between stations, train time table, live station, train coach position, train fare, platform locator, cancelled, rescheduled, diverted, and fog affected trains.</p>&nbsp;
                <p>Why Choose Gaamini?</p>
                <p>Gaamini provides a one-stop solution for the diverse needs of every train passenger. </p>
            </div>
        </div>
    )
}
export default Search;