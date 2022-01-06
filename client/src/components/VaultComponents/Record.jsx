import { useState } from "react";
import '../../styles/HomeVault.css'

import React from 'react'

const Record = ({site, decryptPassword}) => {

    const [eye, setEye] = useState("fas fa-eye")
    const [status, setStatus] = useState(1) // hidden-1, show-0

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
        <section className="vault__contents">
            <p><b>Site Name: </b>{site.siteName}</p>
            <p><b>User Name: </b>{site.uname}</p>
            <div className="vault__content--password-field">
                <p style={{display:"inline"}}><b>Password:</b></p> <button className="toggle" onClick={()=>runThese({password:site.password, _id:site._id, status:status})}>
                    <i className={`${eye} eye`}></i></button>
                <p> {status  ? "*********  " : site.password}
                    
                </p>
            </div>
        </section>
        </>
    )
}

export default Record
