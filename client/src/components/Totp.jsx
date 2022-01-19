import {useState} from 'react';
import axios from "axios"
import "../styles/AuthForms.css"
import HomeNavbar from './HomeNavbar';
import { useNavigate } from 'react-router-dom';

const Totp = () => {

    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get("http://localhost:5000/api/user/totp-status",config)
            const response = await axios.post("http://localhost:5000/api/user/totp-verification",{secret_32 : data.base32, code : code}, config)
            if(response.data===true){
                navigate('/vault-home')
            }
        } catch (err) {
            console.log(err);
        }
    }

  return <>
    <HomeNavbar/>
            <section className='form__container'>
                <div className="form__wrapper-totp">
                <h1 className='form__heading'>Second Step</h1><hr/>
                <p className='totp__instructions'>
                    Enter the six Digit Pin on the authenticator app to proceed!
                </p>
                <form onSubmit={handleSubmit}>    
                    <label>Enter 6 digit pin:</label>
                        <input type='number' 
                            value = {code}
                            required 
                            placeholder='Enter 6 digit Code'
                            onChange={(e)=> setCode(e.target.value)}
                            />  
                    <div className="form__submit">
                        <button type="submit" className='submit-button'>Continue</button>
                    </div>
                </form>
                </div>
            </section>
        </>
};

export default Totp;
