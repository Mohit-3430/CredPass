import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css'

const LoginForm = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
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

    return (
        <>
            <section className='form'>
                <h1 id='form__heading'>LogIn</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter Email:</label>
                    <br/>
                    <input type='email'
                        value = {emailId}
                        required
                        autoFocus
                        onChange={(e)=> setEmailId(e.target.value)}
                         />
                    <br />
                    <label>Enter Password:</label>
                    <br />
                    <input type='password' 
                        value = {password}
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    <br />
                    <div id="form__submit">
                    <input type="submit" />
                    </div>
                    {message && <div id='response'>{message}</div>}
                </form>
            </section>
        </>
    )
}

export default LoginForm;
