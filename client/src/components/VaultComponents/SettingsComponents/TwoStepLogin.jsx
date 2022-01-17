import React, {useState} from 'react'
import ReactModal from "react-modal"

ReactModal.setAppElement('#root')
const TwoStepLogin = () => {
    const [modal, setModal] = useState(false);

    const modalSubmit=()=>{
        console.log("hie")
    }

    return (
        <>
         <div className="settings-section" id="two-step-login">
            <div className="settings-section__header">
                <h2>Two Step Login</h2>
                <hr />
                <span>This is an additional step to secure your account</span>
                <button onClick={()=>setModal(true)}>Manage</button><br/>
                <span>Current Status:</span>
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
        <section>
            <i onClick={()=>setModal(false)} className='fas fa-times close'></i>
            <h3>Two-factor-authentication</h3>
            <form onSubmit={modalSubmit} className='modal__container--form'>
            </form>  
        </section>
        </ReactModal>
        </div>  
        </>
    )
}

export default TwoStepLogin;
