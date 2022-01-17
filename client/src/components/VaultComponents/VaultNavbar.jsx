import "../../styles/VaultNavbar.css"
import {Link} from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

const VaultNavbar = ({uname}) => {

    const [showNav, setShowNav] = useState("hide")
    const [bars, setBars] = useState("fa-bars")
    const [extraMenu, setExtraMenu] = useState(false)
    const [caret, setCaret] = useState("down")
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

    const toggleNav = ()=>{
        if(showNav==="hide"){
            setShowNav("show");
            setBars("fa-times")
        }
        else{
            setShowNav("hide");
            setBars("fa-bars")
        }
    }
    const extraMenuToggle = ()=>{
        if (extraMenu===true) {
            setCaret("down");
            setExtraMenu(false);
        }
        else{
            setCaret("up");
            setExtraMenu(true)
        }
    }

    return (
        <>  
        <nav className="nav">
            <div className="nav__brand">
                <Link to='/vault-home'>PVA</Link>
                <i onClick={()=>toggleNav()} className={`fas ${bars}`}></i>
            </div>
            <div className={`nav__links ${showNav}`}>
                <ul>
                    <li onClick={()=>toggleNav()}><Link to='/vault-home'>Home</Link></li>
                    <li onClick={()=>toggleNav()}><Link to='/vault-create'>Add</Link></li>
                    <div className="extra__menu">
                    <li onClick={()=>extraMenuToggle()}>Dashboard <i className={`fas fa-caret-${caret}`}></i>
                        {extraMenu && 
                        <ul>
                            <div className="toggle--extra__menu">
                                <li className="user__name"><Link to='#'>@ {superUser}</Link></li>
                                <li><Link to='#'><i className="fas fa-user"></i> Profile</Link></li>
                                <li><Link to='/settings'><i className="fas fa-cog"></i> Settings</Link></li>
                                <li><Link to='/logout'><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                            </div>
                        </ul>
                        }
                    </li>
                    </div>
                </ul>  
            </div>
        </nav>
        </> 
    );
}

export default VaultNavbar;