import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import VaultNavbar from "./VaultNavbar"
import '../../styles/AuthForms.css'

const CreateVault = () => {

    const [siteName, setSiteName] = useState("")
    const [uname, setUname] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [userName, setUserName] = useState("")
    const [eye, setEye] = useState("fa-eye")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUname = ()=>{
            axios.get(`http://localhost:5000/api/vault-data/`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
            }).then(res =>{
                    setUserName(res.data.user)
            }).catch(err =>console.log(`${err}`))
        }
        fetchUname()
        
        return ()=>{
            setUserName("")
        }

    }, [])

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const config = {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        }

        try {
            const response = await axios.post("http://localhost:5000/api/vault-create", {siteName, uname, password, userName}, config);
            if(response.status===200){
                setTimeout(()=>{
                    setMessage("Added!!")
                    navigate('/vault-home')
                    setMessage("")
                },1500)
            } else {
                setMessage("Invalid Operation")
            }

        }catch(err){
            console.log(err)
            setMessage("You Are UNAUTHORIZED")
            console.log(err)
            setTimeout(()=>{
                navigate('/Logout')
            }, 1500)
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
            <VaultNavbar uname={userName}/>
            <section className='form__container'>
            <div className="form__wrapper create-vault">
                <h1 className='form__heading'>Add Site</h1>
                <form onSubmit={handleSubmit}>
                    <label>Site Name:</label>
                    <input type='text'
                        value = {siteName}
                        required autoFocus
                        placeholder='Enter site name or URL'
                        onChange={(e)=> setSiteName(e.target.value)}
                         />
                    <label>User Name:</label>
                    <input type='text'
                        value = {uname}
                        required placeholder='Enter User Name'
                        onChange={(e)=> setUname(e.target.value)}
                         />
                    <label>Password:</label>
                    <input type='password' 
                        value = {password}
                        required id='pswd'
                        placeholder='Enter Password'
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                        <i className={`fas ${eye} eye`} onClick={()=>togglePassword()}></i>
                    <div className="form__submit">
                    <button type="submit" className="submit-button">Create</button>
                    </div>
                    {message && <span className='response'>{message}</span>}
                </form>
                </div>
            </section>
        </>
    )
}

export default CreateVault;
