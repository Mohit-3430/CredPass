import React, {useState, useEffect} from 'react'
import axios from "axios";
import "../../styles/EditModalStyle.css";

const EditModal = ({site, setModal, sites, setSites}) => {

    const [siteName, setSiteName] = useState(site.siteName);
    const [uname, setUname] = useState(site.uname);
    const [password, setPassword] = useState(site.password);
    
    const config = {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }
    useEffect(() => {
        
        const decryptPassword = async()=>{
        try{
            const {data} = await axios.post('http://localhost:5000/api/vault-decrypt-password', {siteObj:{password:site.password}}, { headers : {"Authorization" : localStorage.getItem("token")}})
            setPassword(data)
        }catch(err){
            console.log(err);
        }
    }   
    decryptPassword();
    }, [site.password])
    
    
    const modalSubmit = async(e)=>{
        e.preventDefault();
        setModal(false)

        setSites(
            sites.map((val) => {
              return val._id === site._id
                ? {
                    _id: val._id,
                    siteName: siteName,
                    uname: uname,
                    password: password,
                  }
                : val;
            })
          );
        
        try {
            const {data} = await axios.post('http://localhost:5000/api/vault-encrypt-password', {siteObj:{password:password, _id:site._id}}, config)
            await axios.patch(`http://localhost:5000/api/record-edit/${site._id}`, {siteName, uname, password:data}, config);
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <>  <section className='form__container'>
                <hr />
                <i onClick={()=>setModal(false)} className='far fa-window-close close'></i>
                <form onSubmit={modalSubmit}>
                    <label>Site Name:</label><br/>
                    <input type="text" value={siteName} onChange={(e)=> setSiteName(e.target.value)}/><br/>
                    <label>User Name:</label><br/>
                    <input type="text" value={uname} onChange={(e)=> setUname(e.target.value)}/><br/>
                    <label>New Password:</label><br/>
                    <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)}/><br/>
                    <input type="submit" value="Edit"></input>
                </form>  
            </section> 
        </>
    )
}

export default EditModal
