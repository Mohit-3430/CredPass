import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../HomeComponents/HomeNavbar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ForgotPassword/ForgotPassword.css";
import pic from "../../images/completed.svg";

axios.defaults.withCredentials = true;

const ResetPassword = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const { token, emailId } = useParams();
  const [eye, setEye] = useState(true);
  const [ceye, setcEye] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass === cpass) {
      await axios.patch(
        `http://localhost:5000/api/user/reset-password/${emailId}/${token}`,
        {
          password: pass,
          confirmPassword: cpass,
          token,
          emailId,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Password Changed", {
        transition: Zoom,
      });
      setFormSubmitted(true);
    } else {
      toast.info("Passwords Not matched", {
        transition: Slide,
      });
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

  const togglecPassword = () => {
    const cpswd = document.getElementById("cpswd");
    if (eye === true && cpswd.type === "password") {
      setcEye(false);
      cpswd.type = "text";
    } else {
      cpswd.type = "password";
      setcEye(true);
    }
  };

  return (
    <>
      <HomeNavbar />
      {!formSubmitted && (
        <section className="form__container">
          <div className="form__wrapper login">
            <h1 className="form__heading">Change Password</h1>
            <hr />
            <p>Reset your password</p>
            <form onSubmit={handleSubmit}>
              <label>New Password</label>
              <input
                type="password"
                value={pass}
                id="pswd"
                required
                autoFocus
                placeholder="Enter new password"
                onChange={(e) => setPass(e.target.value)}
              />
              <span className="eye" onClick={() => togglePassword()}>
                {eye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
              <label>Confirm Password</label>
              <input
                type="password"
                value={cpass}
                id="cpswd"
                required
                autoFocus
                placeholder="Enter new Password again"
                onChange={(e) => setCpass(e.target.value)}
              />
              <span className="eye" onClick={() => togglecPassword()}>
                {ceye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
              <div className="form__submit">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {formSubmitted && (
        <div className="User--info">
          <img src={pic} className="Info__pic" alt="MailBox" />
          <p className="forgot__password">Super password is updated</p>
          <button
            onClick={() => navigate("/login")}
            className="proceed__buttons"
          >
            Login
          </button>
        </div>
      )}
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default ResetPassword;
