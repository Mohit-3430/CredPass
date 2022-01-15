import "../../styles/VaultNavbar.css"
import {Link} from 'react-router-dom'
import { useState } from "react"

const Navbar = () => {

    const [showNav, setShowNav] = useState("hide")
    const [bars, setBars] = useState("fa-bars")

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

    return (
        <>  
        <nav className="nav">
            <div className="nav__brand">
                PVA
                <i onClick={()=>toggleNav()} className={`fas ${bars}`}></i>
            </div>
            <div className={`nav__links ${showNav}`}>
                <ul>
                    <li onClick={()=>toggleNav()}><Link to='/vault-home'>Home</Link></li>
                    <li onClick={()=>toggleNav()}><Link to='/vault-create'>Add</Link></li>
                    <li onClick={()=>toggleNav()}><Link to='/Logout'>Logout</Link></li>
                </ul>  
            </div>
        </nav>
        </> 
    );
}

export default Navbar;