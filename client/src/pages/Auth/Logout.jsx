import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Utils/Reload.css";
import axios from "axios";
import { useAuth } from "../../Context";

axios.defaults.withCredentials = true;

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const removeData = async () => {
    await axios.get("http://localhost:5000/api/user/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("emailId");
    auth.logout();
  };

  useEffect(() => {
    removeData();
    setTimeout(() => {
      navigate("/Login");
    }, 800);
    //eslint-disable-next-line
  }, []);

  return (
    <center>
      <div className="loader"></div>
      <h1>Loading..</h1>
    </center>
  );
};

export default Logout;
