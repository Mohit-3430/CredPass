import "../../styles/HomeNavbar.css"
import {Link} from 'react-router-dom'

const HomeNavbar = () => {

    return (
        <>
            <ul className='nav'>
                <li className='nav__links'><Link to='/vault-home'>Home</Link></li>
                <li className='nav__links' ><Link to='/vault-create'>Create</Link></li>
                <li className='nav__links nav__rightLink'><Link to='/Logout'>Logout</Link></li>
            </ul>  
        </> 
    );
}

export default HomeNavbar