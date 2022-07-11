import React, { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import axios from "axios";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/user/reset-password-email",
        {
          emailId,
        }
      );
      setFormSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HomeNavbar />
      {!formSubmitted && (
        <section className="form__container">
          <div className="form__wrapper login">
            <h1 className="form__heading">Forgot Password</h1>
            <hr />
            <p>Enter the registed email to send the password link.</p>
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={emailId}
                required
                autoFocus
                placeholder="Enter Email"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <div className="form__submit">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {formSubmitted && <div>Close this tab and check your email</div>}
    </>
  );
};

export default ForgotPassword;
