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

    return (
        <>  
            <VaultNavbar />
            <section className='form'>
                <h1 id='form__heading'>Vault Create</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter Site Name:</label>
                    <br/>
                    <input type='text'
                        value = {siteName}
                        required
                        onChange={(e)=> setSiteName(e.target.value)}
                         />
                    <br />
                    <label>Enter User Name:</label>
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
                    <div id="form__submit">
                    <input id="SubmitButton" type="submit" />
                    </div>
                    {message && <span id='response'>{message}</span>}
                </form>
            </section>
        </>
    )
}

export default CreateVault;
