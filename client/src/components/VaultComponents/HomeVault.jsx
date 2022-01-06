import { useEffect, useState } from "react"
import axios from "axios"
import '../../styles/HomeVault.css'
import Record from "./Record"
import { useNavigate } from "react-router-dom"

const HomeVault = () => {

    const [uname, setUname] = useState("")
    const [sites, setSites] = useState([])  
    const navigate = useNavigate();

    const getUserName = () =>{
        const user = localStorage.getItem("token");
        if(user){
            let userInfo = window.atob(user.split('.')[1]).split(':')[1].split(',')[0]
            userInfo = userInfo.replace(/"/g,"");
            setUname(userInfo)
        }
        else {
            setUname(",Login to Get Details")
        }
    }

    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }

    const decryptPassword = async(siteObj) => {
        
        if (siteObj.status ===1) {
            // console.log(siteObj.password);
            try {
                const res = await axios.post(`http://localhost:5000/api/vault-decrypt-password/`,{siteObj}, config)
                siteObj.password = res.data;
            setSites(sites.map((site)=>{
                return site._id === siteObj._id ? 
                {
                    _id : site._id,
                    siteName : site.siteName,
                    uname : site.uname,
                    password : res.data
                } : site
            }))
            } catch (err) {
                console.log(err)
            }
        }       
        else if(siteObj.status ===0)
        {
            try {
                const res = await axios.post(`http://localhost:5000/api/vault-encrypt-password/`,{siteObj}, config)
                console.log(res.data)
                console.log(siteObj.password);
                setSites(sites.map((site)=>{
                return site._id === siteObj._id ? 
                {
                    _id : site._id,
                    siteName : site.siteName,
                    uname : site.uname,
                    password : res.data,
                } : site
            }))   
            } catch (error) {
                console.log(error);   
            }
        }            
           
    }

    
    useEffect(() => {
        getUserName();

        const fetchSites = ()=>{
            axios.get(`http://localhost:5000/api/vault-data/`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            },
            params : {
                uid : uname
            }
            }).then(res =>{
                    setSites(res.data.sites)
            }).catch(err =>console.log(`${err}`))
        }
        fetchSites()

    },[uname])
    
    return (
        <>
            <h1 id="welcome__message">Welcome 👋, {uname} </h1>
            <p id='ref'><u>Your Vault:</u>
                <i class="fas fa-plus plus" onClick={()=>navigate('/vault-create')}></i>
            </p>
            <main className="vault">
            {sites.map(site => (
              <Record site={site} key={site._id} decryptPassword={decryptPassword}/>
            ))}  
            </main>
        </>
    )
}

export default HomeVault
