import "../../styles/HomeNavbar.css"
import {Link} from 'react-router-dom'

const HomeNavbar = () => {

    const linkStyle =  {
        textDecoration: "none",
        color : 'white'
    }

    return (
        <>
            <ul className='nav'>
                <li className='nav__links'><Link style ={linkStyle} to='/vault-home'>Home</Link></li>
                <li className='nav__links nav__rightLink' ><Link style ={linkStyle} to='/vault-create'>Create</Link></li>
                <li className='nav__links nav__rightLink'><Link style ={linkStyle} to='/Logout'>Logout</Link></li>
            </ul>  
        </> 
    );
}

export default HomeNavbar