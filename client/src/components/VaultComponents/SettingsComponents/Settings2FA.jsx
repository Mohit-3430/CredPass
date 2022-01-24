import VaultNavbar from "../VaultNavbar"
import TwoStepLogin from "./TwoStepLogin"
import "../../../styles/Settings.css"
import axios from "axios"
import {useState,useEffect} from "react"
import SettingsLinks from "./SettingsLinks"

const Settings2Fa = () => {
    const [superUser, setSuperUser] = useState("")

    useEffect(() => {
        
        const fetchSuperUserName = ()=>{
            axios.get(`http://localhost:5000/api/vault-data/`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
            }).then(res =>{
                    setSuperUser(res.data.user)
            }).catch(err =>console.log(`${err}`))
        }
        fetchSuperUserName()
    },[])

    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
            <SettingsLinks />   
            <section className="settings-section__container">
                <TwoStepLogin superUser={superUser}/>
            </section>
        </section>
        </>
    )
}

export default Settings2Fa;