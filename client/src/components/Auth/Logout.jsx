import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Utils/Reload.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const Logout = () => {
  localStorage.removeItem("user");
  const removeData = async () => {
    await axios.get("http://localhost:5000/api/user/logout", {
      withCredentials: true,
    });
  };
  const navigate = useNavigate();

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
