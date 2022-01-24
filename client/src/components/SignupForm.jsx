import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "../styles/AuthForms.css"
import axios from 'axios';
import { FaEye, FaEyeSlash} from "react-icons/fa"
import HomeNavbar from './HomeNavbar';

const SignupForm = () => {
    
    const [emailId, setEmailId] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [againPassword, setAgainPassword] = useState("");
    const [message, setMessage] = useState("");
    const [eye, setEye] = useState(true)
    const [ceye, setcEye] = useState(true)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password!==againPassword){
            
            setMessage("Passwords Not matched!!")

            setPassword("")
            setAgainPassword("")
            
        }
        else{
            setMessage("")
            const config = {
                header : {
                    "Content-Type" : "application/json"
                }
            }

            try {
                const data = await axios.post("http://localhost:5000/api/user/register", {emailId, password, uname, againPassword}, config)
                console.log(data);
                navigate('/login')
            }catch (err){
                console.log(err)
            }
                
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

    const togglecPassword =()=>{
        const cpswd = document.getElementById('cpswd')
        if(eye===true && cpswd.type==="password") {
            setcEye(false);
            cpswd.type="text"
        }
        else {
            cpswd.type="password"
            setcEye(true);
        }
    }

    return (
        <>
        <HomeNavbar />
            <section className='form__container'>
            <div className="form__wrapper register">
                <h1 className='form__heading'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type='email'
                        value = {emailId}
                        required autoFocus
                        placeholder='Enter Valid Email ID'
                        onChange={(e)=> setEmailId(e.target.value)}
                         />
                    <label>User Name:</label>
                    <input type='text'
                        value = {uname}
                        required
                        placeholder='Enter User Name'
                        onChange={(e)=> setUname(e.target.value)}
                         />
                    <label>Password:</label>
                    <input type='password' 
                        value = {password}
                        required id='pswd'
                        placeholder='Set a Password'
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    <span className="eye" onClick={()=> togglePassword()}>{eye===true ? <FaEye /> : <FaEyeSlash />}</span>
                    <label>Confirm Password:</label>
                    <input type='password' 
                        value = {againPassword}
                        required id='cpswd'
                        placeholder='Confirm Password'
                        onChange={(e)=> setAgainPassword(e.target.value)}
                        />
                    <span className="eye" onClick={()=> togglecPassword()}>{ceye===true ? <FaEye /> : <FaEyeSlash />}</span>
                    {message && <p className="errmsg">{message}</p>}
                    <div className="form__submit">
                    <button type='submit' className='submit-button'>Register</button>
                    </div>
                </form>
                    <div className="dialogs">
                        <p>Existing User? <Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignupForm
