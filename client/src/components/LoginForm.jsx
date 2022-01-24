import axios from 'axios'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HomeNavbar from './HomeNavbar';

const LoginForm = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [eye, setEye] = useState(true)
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        setMessage("")
        try {
            const {data} = await axios.post("http://localhost:5000/api/user/login", {emailId, password})
            // TOTP Enabled
            if(data.success==="partial" && data.totpStatus===true){
                localStorage.setItem('user', data.superUser);
                navigate('/login-totp')
            }
            // TOTP Disabled
            else if(data.success===true && data.totpStatus===false){
                localStorage.setItem('token', data.token);
                localStorage.setItem('expires', data.expiresIn);
                localStorage.setItem('user', data.superUser);
                setMessage("")
                navigate('/vault-home')
            } 
            else {
                setMessage("User Not Found, Pls register");
                setTimeout(()=>{
                    navigate('/signup')
                },1500)
            }

        }catch(err){
            setMessage("User Not Found Pls register")
            setTimeout(()=>{
                navigate('/signup')
            },1500)
        }
            
    }

    const togglePassword= ()=>{
        const pswd = document.getElementById('pswd')
        if(eye===true && pswd.type==="password") {
            setEye(false);
            pswd.type="text"
        }
        else {
            pswd.type="password"
            setEye(true);
        }
    }

    return (
        <>
        <HomeNavbar/>
            <section className='form__container'>
                <div className="form__wrapper login">
                <h1 className='form__heading'>Sign In</h1><hr/>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type='email'
                        value = {emailId}
                        required
                        autoFocus placeholder='Enter Email'
                        onChange={(e)=> setEmailId(e.target.value)}
                         />
                    <label>Password:</label>
                        <input type='password' 
                            value = {password} id='pswd'
                            required placeholder='Enter Password'
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        <span className="eye" onClick={()=> togglePassword()}>{eye===true ? <FaEye /> : <FaEyeSlash />}</span>
                    <div className="form__submit">
                    <button type="submit" className='submit-button'>Log In</button>
                    </div>
                    {message && <div className='response'>{message}</div>}
                </form>
                    <div className="dialogs">
                        <p><Link to='#'>Forgot Password??</Link></p>
                        <p><Link to='/signup'>New here, Register</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginForm;
