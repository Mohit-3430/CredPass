import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VaultNavbar from "./VaultNavbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthForms.css";

const CreateVault = () => {
  const [siteName, setSiteName] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUname = () => {
      axios
        .get(`http://localhost:5000/api/vault-data/`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUserName(res.data.user);
        })
        .catch((err) => console.log(`${err}`));
    };
    fetchUname();

    return () => {
      setUserName("");
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/vault-create",
        { siteName, uname, password, userName },
        config
      );
      if (response.status === 200) {
        toast.info("Added!!", {
          autoClose: 3000,
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/vault-home");
        }, 3000);
      } else {
        toast.warn("Invalid Operation", {
          autoClose: 3000,
          transition: Slide,
        });
      }
    } catch (err) {
      toast.error("Login to access", {
        autoClose: 3000,
        transition: Flip,
      });

      setTimeout(() => {
        navigate("/Logout");
      }, 3000);
    }
  };

  const togglePassword = () => {
    const pswd = document.getElementById("pswd");
    if (eye === true && pswd.type === "password") {
      setEye(false);
      pswd.type = "text";
    } else {
      pswd.type = "password";
      setEye(true);
    }
  };

  return (
    <>
      <VaultNavbar />
      <section className="form__container">
        <div className="form__wrapper create-vault">
          <h1 className="form__heading">Add Site</h1>
          <form onSubmit={handleSubmit}>
            <label>Site Name:</label>
            <input
              type="text"
              value={siteName}
              required
              autoFocus
              placeholder="Enter site name or URL"
              onChange={(e) => setSiteName(e.target.value)}
            />
            <label>User Name:</label>
            <input
              type="text"
              value={uname}
              required
              placeholder="Enter User Name"
              onChange={(e) => setUname(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              required
              id="pswd"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye" onClick={() => togglePassword()}>
              {eye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreateVault;
