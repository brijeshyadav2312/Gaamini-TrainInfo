import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import train from './train.png'

const Navbaar = () => {
  const [sBg, setSBg] = useState("#F5F9FB");
  const [nBg, setNBg] = useState("#F5F9FB");
  const location = useLocation();
  useEffect(() => {
    if (window.location.pathname === "/" ) {
      setSBg("#6fcdff");
    } else {
      setSBg('#F5F9FB')
    }

    if (window.location.pathname === "/Pnr-Status") {
      setNBg("#6fcdff");
    } else {
      setNBg('#F5F9FB')
    }
  }, [location]);

  return (
    <div>
      <div className='nav'>
        <div className='logoSec'>
          <img  src={train} alt="train"/>
          <Link to = "/"><span>GAAMINI</span></Link>
        </div>
      <span>GitHub</span>
      </div>
      <div className='category'>
        <Link style={{backgroundColor: sBg}} to = "/"><span >Search Train</span></Link>
        <Link style={{backgroundColor: nBg}} to = "/Pnr-Status"><span >PNR Status</span></Link>
      </div>
    </div>
  )
}

export default Navbaar
