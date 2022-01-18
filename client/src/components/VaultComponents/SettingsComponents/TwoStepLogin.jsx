import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactModal from "react-modal"

ReactModal.setAppElement('#root')
const TwoStepLogin = () => {
    const [modal, setModal] = useState(false);
    const [showQR, setShowQR] = useState(false)
    
    const [code, setCode] = useState("")
    const [superPassword, setSuperPassword] = useState("");
    const [eye, setEye] = useState("fa-eye");

    const [resQR, setResQR] = useState("");
    const [res32Code, setRes32Code] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        const getStatus = async()=>{
            try {
                const {data} = await axios.get('http://localhost:5000/api/user/totp-status', {headers : {"Authorization" : localStorage.getItem("token")}});
                setStatus(data)
            } catch (error) {
                console.log(error)  
            }
        }
        getStatus();
    }, [])

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }

    const getQR = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:5000/api/user/totp-show', config)
            setRes32Code(data.code)
            setResQR(data.scan)
        } catch (error) {
          console.log(error);
        }
    }

    const modalSubmit= async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:5000/api/user/only-password', {password:superPassword},{headers : {
            "Authorization" : localStorage.getItem("token")}
        });
            if(data.success===true){
                setShowQR(true)
                getQR();
            }else console.log(false)

        } catch (error) {
            console.log(error)
        }
    }
    const submit2FA= async(e)=>{
        e.preventDefault();
        // TODO: Make Call to display QR and modify user schema
        try{   
            const {data} = await axios.post('http://localhost:5000/api/user/totp-verification', {secret_32:res32Code, code:code},{headers : {
            "Authorization" : localStorage.getItem("token")}
        });
            if(data===true){
                setStatus("Enabled")
                setModal(false)
                setShowQR(false)
            }
            else{
                console.log("Wrong Code, Check Again")
            }
        }catch(err){
            console.log(err)
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

    return (
        <>
         <div className="settings-section" id="two-step-login">
            <div className="settings-section__header">
                <h2>Two Step Login</h2>
                <hr />
                <p>This is an additional step to secure your account</p>
                <p>Current Status:{status}</p>
                <button onClick={()=>setModal(true)}>Manage</button><br/>
            </div>
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
            {showQR===false ? <>
            <i onClick={()=>{setModal(false);setSuperPassword(false)}} className='fas fa-times close'></i>
            <h3 className='modal__container--title'>Confirm Yourself:</h3>
            <form onSubmit={modalSubmit} className='modal__container--form'>
                <label>Enter Super Password:</label>
                <div>
                <input type="password" id="pswd"value={superPassword} onChange={(e)=> setSuperPassword(e.target.value)}/>
                <i className={`fas ${eye} eye`} onClick={()=>togglePassword()}></i>
                </div>
                <div className='modal__container--form-buttons'>
                    <button className='change__buttons'>Proceed</button>
                    <button onClick={()=>{setModal(false); setSuperPassword("")}} className='cancel__buttons'>Cancel</button>
                </div>
            </form>
            </>: null}
            {showQR===true ? <>
                <i onClick={()=>{setModal(false);setSuperPassword(false)}} className='fas fa-times close'></i>
                <h3 className='modal__container--title'>Two-Step Login</h3>
                <p>Follow the Steps to setup the process on your authenticator App</p>
                <ul className='instructions'>
                    <li>Download the App on your device</li>
                    <div>
                    <li>Scan this QR code with the app</li>
                    <center>
                        <img src={resQR} alt='QRCODE'></img>
                        <p>OR</p>
                        <p>{res32Code}</p>
                    </center>
                    </div>
                    <li>Now, After Scanning enter the 6-digit pin below</li>
                </ul>
            <form onSubmit={submit2FA} className='two-step-form'>
                <label>Enter 6-digit Code:</label>
                <input type="number" required id="code" value={code} onChange={(e)=> setCode(e.target.value)}/>
                <div className='two-fa-form-buttons'>
                    <button className='change__buttons'>Enable</button>
                    <button onClick={()=>{setShowQR(false);setModal(false);setSuperPassword("")}} className='cancel__buttons'>Close</button>
                </div>
            </form> </>
            :null}
        </section>  
            </ReactModal>
        </div>  
        </>
    )
}

export default TwoStepLogin;
