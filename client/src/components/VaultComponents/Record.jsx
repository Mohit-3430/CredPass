import { useState } from "react";
import axios from "axios";
import '../../styles/HomeVault.css'

import React from 'react'
import EditModal from "./EditModal";

const Record = ({site, sites, setSites, decryptPassword}) => {

    const [eye, setEye] = useState("fas fa-eye")
    const [status, setStatus] = useState(1) // hidden-1, show-0
    const [modal, setModal] = useState(false);

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

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }
    
    const removeRecord = async(siteId)=>{
        
        try{
            await axios.delete(`http://localhost:5000/api/record-delete/${siteId}`, config);
            setSites(sites.filter(val=>{
                return val._id !== siteId;
            }))
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <section className="vault__contents">
            <div className="vault__contents--edit-icons"><i onClick={()=>removeRecord(site._id)} className="fas fa-trash"></i>
                <i onClick={()=>setModal(true)} className="fas fa-edit"></i>
            </div>
            <p><b>Site Name: </b>{site.siteName}</p>
            <p><b>User Name: </b>{site.uname}</p>
            <div className="vault__content--password-field">
                <p style={{display:"inline"}}><b>Password:</b></p> <button className="toggle" onClick={()=>runThese({password:site.password, _id:site._id, status:status})}>
                    <i className={`${eye} eye`}></i></button>
                <p> {status  ? "*********  " : site.password}  
                </p>
            </div>
        </section>
        {modal && <EditModal site={site} sites={sites} setModal={setModal} setSites={setSites}/>}
        </>
    )
}

export default Record
