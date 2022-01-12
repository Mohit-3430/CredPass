import { useEffect, useState } from "react"
import axios from "axios"
import '../../styles/HomeVault.css'
import Record from "./Record"
import { useNavigate } from "react-router-dom"

const HomeVault = () => {

    const [uname, setUname] = useState("")
    const [sites, setSites] = useState([])  
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchSites = ()=>{
            axios.get(`http://localhost:5000/api/vault-data/`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
            }).then(res =>{
                    setSites(res.data.sites)
                    setUname(res.data.user)
            }).catch(err =>console.log(`${err}`))
        }
        fetchSites()
    },[])

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

    return (
        <>
            <h1 id="message">Welcome 👋, {uname} </h1>
            {sites.length> 0 ?
            <>
            <p id='ref'><u>Your Vault:</u>
                <i className="fas fa-plus plus" onClick={()=>navigate('/vault-create')}></i>
            </p>
            <main className="vault">
            {sites.map(site => (
              <Record site={site} sites={sites} setSites={setSites} key={site._id} decryptPassword={decryptPassword}/>
            ))}  
            </main>
            </>
            : 
            <>  
                <p id="message" style={{display:"inline"}}>There is no data to display, Add now</p>
                <i className="fas fa-plus plus-new" onClick={()=>navigate('/vault-create')}></i>
            </>
            }
        </>
    )
}

export default HomeVault
