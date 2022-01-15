import React, {useState, useEffect} from 'react'
import axios from "axios";
import ReactModal from 'react-modal';
import "../../styles/EditModalStyle.css";

ReactModal.setAppElement('#root')
const EditModal = ({siteModal, setModal, modal, sites, setSites, close}) => {

    const [siteName, setSiteName] = useState(siteModal.siteName);
    const [uname, setUname] = useState(siteModal.uname);
    const [password, setPassword] = useState(siteModal.password);
    const [eye, setEye] = useState("fa-eye")

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }
    useEffect(() => {
        
        const decryptPassword = async()=>{
        try{
            const {data} = await axios.post('http://localhost:5000/api/vault-decrypt-password', {siteObj:{password:siteModal.password}}, { headers : {"Authorization" : localStorage.getItem("token")}})
            setPassword(data)
        }catch(err){
            console.log(err);
        }
    }   
    decryptPassword();
    }, [siteModal.password])
    
    const modalSubmit = async(e)=>{
        e.preventDefault();
        setModal(false)

        setSites(
            sites.map((val) => {
              return val._id === siteModal._id
                ? {
                    _id: val._id,
                    siteName: siteName,
                    uname: uname,
                    password: password,
                  }
                : val;
            })
          );
        
        try {
            const {data} = await axios.post('http://localhost:5000/api/vault-encrypt-password', {siteObj:{password:password, _id:siteModal._id}}, config)
            await axios.patch(`http://localhost:5000/api/record-edit/${siteModal._id}`, {siteName, uname, password:data}, config);
        } catch (error) {
          console.log(error);
        }
    }

    const togglePassword= ()=>{
        const pswd = document.getElementById('pswd')
        if(eye==='fa-eye' && pswd.type==="password") {
            setEye('fa-eye-slash');
            pswd.type="text"
        }
        else {
            pswd.type="password"
            setEye('fa-eye');
        }
    }

    return(
        <>
        <ReactModal isOpen={modal} onRequestClose={()=>setModal(false)} shouldCloseOnOverlayClick={true}
            style={{
                content:{
                    position : "static",
                    inset : "0px",
                    border: "none",
                    background : "none",
                    visibility : "none",
                },
                overlay :{backgroundColor : "rgb(184 184 184 / 75%)"}
            }}   
            >
        <section className='modal__container'>
            <i onClick={()=>setModal(false)} className='fas fa-times close'></i>
            <h3 className='modal__container--title'>Edit</h3>
            <form onSubmit={modalSubmit} className='modal__container--form'>
                <label>Site Name:</label>
                <input type="text" value={siteName} onChange={(e)=> setSiteName(e.target.value)}/>
                <label>User Name:</label>
                <input type="text" value={uname} onChange={(e)=> setUname(e.target.value)}/>
                <label>New Password:</label>
                <div className="pass">
                    <input type="password" id='pswd' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <i className={`fas ${eye} eye`} onClick={()=>togglePassword()}></i>
                </div>
                <div className='modal__container--form-buttons'>
                    <button type="submit" className='change__buttons'>Change</button>
                    <button onClick={()=>setModal(false)} className='cancel__buttons'>Cancel</button>
                </div>
            </form>  
        </section>
        </ReactModal>
        </>
    )
}

export default EditModal;
