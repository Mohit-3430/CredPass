import axios from 'axios'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css'
import HomeNavbar from './HomeNavbar';

const LoginForm = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [eye, setEye] = useState("fa-eye")
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        setMessage("")
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", {emailId, password})
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expires', response.data.expiresIn);

            if(response.status===200){
                setMessage("")
                navigate('/vault-home')
            } else {
                setMessage("User Not Found, Pls register");
                setTimeout(()=>{
                    navigate('/regester')
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
                        <i className={`fas ${eye} eye`} onClick={()=>togglePassword()}></i>
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
