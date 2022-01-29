import { useState, useEffect} from "react";
import axios from "axios";
import '../../styles/Record.css'
import {FaEye, FaEyeSlash, FaTrash } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit } from "react-icons/md";
import React from 'react'

const Record = ({site, sites, setSites, setModal, setSiteModal}) => {

    const [eye, setEye] = useState(true)
    const [status, setStatus] = useState(1) // hidden-1, show-0

    const changeEye = ()=>{
        if (eye===true) {
            setStatus(0)
            setEye(false)
        }
        else{
            setStatus(1)
            setEye(true)
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
            toast.warn("Record Deleted!",{
                autoClose : 1500,
                hideProgressBar : true,
                transition : Slide
            })
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
            <div className="vault__contents--edit-icons">
                <span onClick={()=>removeRecord(site._id)} className="trash"> <FaTrash /></span>
                <span onClick={()=>editStuff(site)} className="edit"><MdEdit /></span>
            </div>
            <p><b>Site Name: </b>{site.siteName}</p>
            <p><b>User Name: </b>{site.uname}</p>
            <div className="vault__content--password-field">
                <p style={{display:"inline"}}><b>Password:</b></p> 
                  <span className="reye" onClick={()=> changeEye()}> {eye===true ? <FaEye /> : <FaEyeSlash />}</span>
                <p> {status  ? "●●●●●●●●" : site.password}  
                </p>
            </div>
        <ToastContainer />
        </section>
        </>
    )
}

export default Record
