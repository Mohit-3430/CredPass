import { useState, useEffect} from "react";
import axios from "axios";
import '../../styles/Record.css'

import React from 'react'

const Record = ({site, sites, setSites, setModal, setSiteModal}) => {

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

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }
    useEffect(() => {
        
        const decryptPassword = async(siteObj) =>{
    
            const res = await axios.post(`http://localhost:5000/api/vault-decrypt-password/`,{siteObj: {password:site.password}}, {headers : {"Authorization" : localStorage.getItem("token")}})
            siteObj.password = res.data;
            setSites(sites.map((site)=>{
            return site._id === siteObj._id ? 
                {
                    _id : site._id,
                    siteName : site.siteName,
                    uname : site.uname,
                    password : res.data
                } : site
            }))
        }
        decryptPassword(site)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

    const editStuff = (site)=>{
        setModal(true);
        setSiteModal(site)
    }

    return (
        <>
        <section className="vault__contents">
            <div className="vault__contents--edit-icons"><i onClick={()=>removeRecord(site._id)} className="fas fa-trash"></i>
                <i onClick={()=>editStuff(site)} className="fas fa-edit"></i>
            </div>
            <p><b>Site Name: </b>{site.siteName}</p>
            <p><b>User Name: </b>{site.uname}</p>
            <div className="vault__content--password-field">
                <p style={{display:"inline"}}><b>Password:</b></p> <button className="toggle">
                    <i className={`${eye}`} onClick={()=>changeEye()}></i></button>
                <p> {status  ? "●●●●●●●●" : site.password}  
                </p>
            </div>
        </section>
        </>
    )
}

export default Record
