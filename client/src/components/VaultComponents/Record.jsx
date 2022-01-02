import { useState } from "react";
import '../../styles/HomeVault.css'

import React from 'react'

const Record = ({site, decryptPassword}) => {

    const [eye, setEye] = useState("fas fa-eye")
    const [status, setStatus] = useState(1)
    // hidden - 1
    // show - 0

    const changeEye = ()=>{
        if (eye==="fas fa-eye") {
            setStatus(0)
            setEye("fas fa-eye-slash")
        }
        else{
            setStatus(1)
            setEye("fas fa-eye")
        }
    }

    const runThese = (siteObj) =>{
        decryptPassword(siteObj)
        changeEye();
    }

    return (
        <>
          
        <div id="vaultContainer">
            <p><b>Site Name:</b><br/>{site.siteName}</p>
            <p><b>User Name:</b><br/>{site.uname}</p>
            <div>
                <p><b>Password:</b><br/></p> 
                <p id="password"> {status  ? "*********" : site.password}<br/>
                    <button onClick={()=>runThese({password:site.password, _id:site._id, status:status})}>
                    <i className={eye}></i></button>
                </p>
            </div>
        </div>
        </>
    )
}

export default Record
