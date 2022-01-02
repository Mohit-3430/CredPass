import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "../styles/AuthForms.css"
import axios from 'axios';

const SignupForm = () => {
    
    const [emailId, setEmailId] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [againPassword, setAgainPassword] = useState("");
    const [message, setMessage] = useState("");

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

    return (
        <>
            <section className='form'>
                <h1 id='form__heading'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter Email:</label>
                    <br/>
                    <input type='email'
                        value = {emailId}
                        required
                        onChange={(e)=> setEmailId(e.target.value)}
                         />
                    <br />
                    <label>Enter userName:</label>
                    <br/>
                    <input type='text'
                        value = {uname}
                        required
                        onChange={(e)=> setUname(e.target.value)}
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
                    <label>Enter Password Again:</label>
                    <br/>
                    <input type='password' 
                        value = {againPassword}
                        required
                        onChange={(e)=> setAgainPassword(e.target.value)}
                        />
                    <br />
                    {message && <p id ="errmsg">{message}</p>}
                    <div id="form__submit">
                    <button>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default SignupForm
