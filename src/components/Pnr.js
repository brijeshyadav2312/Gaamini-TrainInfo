import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
const Pnr =() =>{

  const ivalue = useRef(null);
  const [querry, setQuerry] = useState('1234567543');
  const [pnrData, setPnrData] = useState({})
  const [error, setError] = useState({})
const options = {
  method: 'GET',
  url: `https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${querry}`,
  headers: {
    'X-RapidAPI-Key': '193054a8e1msh54b91652feb3e3ap1e1bf8jsnad84dc5f1426',
    'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com'
  }
};

  useEffect(_ =>{
    axios.request(options).then(function (response) {
      setPnrData(response.data);
    }).catch(function (error) {
      setError(error);
    });
  },[querry]);
  
  onsubmit = (e) =>{
    e.preventDefault();
    setQuerry(ivalue.current.value)
  }
  const keyHandler = (e) =>{
    if(e.key==='Enter'){
      e.preventDefault();
      setQuerry(ivalue.current.value)
    }
  }
  if(Object.keys(pnrData).length>0){
  //Arrival Data
    const dateA = pnrData.arrival_data.arrival_time;
    const lastWordA = dateA.split(' ');
    var timeA = lastWordA.pop();
    var dayA = lastWordA[0]+" "+lastWordA[1]+lastWordA[2];
  //Departure Data
    const dateD = pnrData.departure_data.departure_time;
    const lastWordD = dateD.split(' ');
    var timeD = lastWordD.pop();
    var dayD = lastWordD[0]+" "+lastWordD[1]+lastWordD[2];
  }
    return(
        <div className="Search">
        <div className="searchsec">
            <div className="inputSec">
                <input type={'text'} ref={ivalue} onKeyDown={keyHandler}  placeholder="Enter 10 Digit PNR Number"/>
                <button type="submit" onClick={onsubmit} >PNR Status</button>
            </div>
        </div>
        {Object.keys(pnrData).length>0?(
        <div className="pnrStatus">
            <div>
              <span>Chart: <span>{pnrData.chart_status}</span></span><span>PNR No: <span>{querry}</span></span>
            </div>
            <div className="quotaClass">
              <span>Quota: <span>{pnrData.quota}</span></span><span>Class: <span>{pnrData.class}</span></span>
            </div>
            <div>Train Name: <span>{pnrData.train_name}</span></div>
            <div className="dataCart">
              <div>
                <p>{pnrData.boarding_station}</p>
                <p>{dayD}</p>
                <p>{timeD}</p>
              </div>
              <div>
                <p>{pnrData.reservation_upto}</p>
                <p>{dayA}</p>
                <p>{timeA}</p>
              </div>
            </div>
            <div>
              {
              pnrData.passenger.map((item,idx) =>{
                return(
                    <div key={idx} className="currentData">
                      <div>
                        <span>Name</span>
                        <span>{item.name}</span>
                      </div>
                      <div>
                        <span>Current Status</span>
                        <span>{item.current_status}</span>
                      </div>
                      <div>
                        <span>Booking Status</span>
                        <span>{item.booking_status}</span>
                      </div>
                    </div>
                )
              })
              }
            </div>
        </div>):(
          <>
            <p style={{color: 'red',marginTop:'1rem',fontSize:'0.9rem'}}>Currently server is busy try after some time</p>
            <p style={{color: 'red'}}>{error.message}</p>
          </>
        )
        }
        <div className="aboutTrain">
            <p>PNR Status FAQs</p><br/>
            <p>What does PNR status give us?</p>&nbsp;
            <p>PNR Status gives us, the train name and number, boarding date and a class of travel, from the station and to the station, boarding station and reservation up-to, number of passengers, coach position (shows when a train arrives at station otherwise shows blank), total fare, chart status (chart prepared or chart not prepared), train running status, booking, and current status information.</p>
            <p>What is a PNR number?</p>&nbsp;
            <p>The full form of PNR is Passenger Name Record; it is a unique ten-digit number, which is allocated to every train ticket booked from Indian railways. Every train ticket has a PNR number, whether you have booked a ticket online through IRCTC or physically at the PRS counter. A single PNR no. can include up to six passengers in case of the group booking.</p>
            <p>How is a PNR Generated?</p>&nbsp;
            <p>The CRIS (Center of Railway Information Systems) runs a centralized database where all the information about passengers is stored. The system automatically generates a unique ten-digit PNR number every time a person buys an Indian Railways ticket whether online through the official IRCTC website or any other travel website or at PRS ticket counters. The generated PNR no. remains valid till the end of the trip and after a certain interval of time old PNR is flushed out of the CRIS database.</p>&nbsp;
            <p>How can I check PNR status of my railway ticket?</p>&nbsp;
            <p>There are many ways through which, passengers can enquire about their ticket PNR status. The most popular ways are listed below:</p>
            <ul>
              <li><b>Online</b>: Type your 10-digit PNR number in the search box present at the top of this webpage. Click on the "Check PNR Status" button and you will get to know the current status of your PNR.</li>
              <li><b>SMS</b>: Indian railway has initiated a text-messaging service for PNR status enquiry to boost customer satisfaction. If a passenger does not have an internet connection, in that case, he or she benefited from this service. To get the updated status of their reservation passenger needs to send a text SMS in the below-given format. Type "PNR space (your PNR number)" e.g. PNR 1234567899 and send it to 139. Before using the SMS service, please keep in mind that carrier charges would apply for SMS service as per your network operator.</li>
              <li><b>Mobile App</b>: You can get the live PNR status update on your corresponding Mobile device using Indian Train or IRCTC App. These applications are available in Google Play or the Apple store.</li>
              <li><b>Phone Calls</b>: Dial 139 from your mobile device, when connected with the Indian Railways telephonic helpline service, you would hear a few instructions offered by IVR. Follow those instructions to get your live PNR status updates.</li>
              <li>Railway Enquiry Counter at Railway Stations: This is an offline and traditional way for PNR enquiry. It is time-consuming and you would surely not love to go with this method but when all the above online and telephonic services don't work out for you, you may opt for this traditional way to get your railway PNR status updates.</li>
            </ul>&nbsp;
            <p>How often should I enquire about PNR status updates?</p>&nbsp;
            <p>If your ticket is on the waiting list, its status is frequently updated to lower waiting lists or confirmed when people cancel their tickets. This process is real-time and that is why you should check PNR status more often on this webpage. Besides, you can install Indian Train App on your handheld device to get an update of your ticket status regularly.</p>
            <p>Where to find the PNR number on the ticket?</p>&nbsp;
            <p>Generally, the PNR number is printed at the top left corner of the I-Ticket purchased from the railway's PRS counter. In the case of E-Ticket, which is reserved online through IRCTC or any other travel web portal is printed at the top in a separate column.</p>
        </div>
    </div>
    )
}
export default Pnr;