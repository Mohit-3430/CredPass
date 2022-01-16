import { useEffect, useState} from "react"
import axios from "axios"
import '../../styles/HomeVault.css'
import Record from "./Record"
import VaultNavbar from "./VaultNavbar"
import EditModal from "./EditModal"
import { useNavigate } from "react-router-dom"

const HomeVault = () => {

    const [uname, setUname] = useState("")
    const [sites, setSites] = useState([])  
    const [modal, setModal] = useState(false);
    const [siteModal, setSiteModal] = useState([])
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


    return (
        <>
        <section className='vault__dashboard'>
        <VaultNavbar uname={uname}/>
            <h1 id="message">Welcome 👋, {uname} </h1>
            {sites.length> 0 ?
            <>
            <p id='ref'><u>Your Vault:</u>
                <i className="fas fa-plus plus" onClick={()=>navigate('/vault-create')}></i>
            </p>
            <main className="vault">
            {sites.map(site => (
              <Record site={site}  sites={sites} setSites={setSites} setModal={setModal} key={site._id} setSiteModal={setSiteModal}/>
              ))}  
            </main>
            
            </>
            : 
            <>  <div className="none">
                <p id="message" style={{display:"inline"}}>There is no data to display, Add now</p>
                <i className="fas fa-plus plus-new" onClick={()=>navigate('/vault-create')}></i>
                </div>
            </>
            }
        </section>
        {modal && <EditModal siteModal={siteModal} modal={modal} sites={sites} setModal={setModal} setSites={setSites} close={()=>setModal(false)}/>}
        </>
    )
}

export default HomeVault
