import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Reload.css"


const Logout = () => {

    function removeData () {
        localStorage.removeItem("token")
        localStorage.removeItem("expires")
        localStorage.removeItem("user")
    }

    const navigate = useNavigate();

    useEffect(() => {
        removeData();
        setTimeout(()=>{
            navigate('/Login')
        },800)
        
    }, [navigate])
    
    return (
        <center>
            <div className="loader"></div>
            <h1>Loading..</h1>
        </center>
    )
}

export default Logout
