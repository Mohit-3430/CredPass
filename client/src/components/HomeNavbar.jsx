import '../styles/HomeNavbar.css'
import {Link} from 'react-router-dom'

const HomeNavbar = () => {

    return (
        <>
            <ul className='nav'>
                <li className='nav__links'><Link to='/'>PMVA</Link></li>
                <li className='nav__links'><Link to='/login'>LOGIN</Link></li>
                <li className='nav__links'><Link to='/signup'>REGISTER</Link></li>
            </ul>  
        </> 
    );
}

export default HomeNavbar