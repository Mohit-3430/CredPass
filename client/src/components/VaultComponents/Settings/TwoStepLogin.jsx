import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Flip, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

ReactModal.setAppElement("#root");
const TwoStepLogin = () => {
  const [superModal, setSuperModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);

  const [code, setCode] = useState("");
  const [superPassword, setSuperPassword] = useState("");
  const [eye, setEye] = useState(true);

  const [resQR, setResQR] = useState("");
  const [res32Code, setRes32Code] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetches status(Enabled or Disabled); base32 & qrcode
    const getStatus = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/totp-status",
          {
            withCredentials: true,
          }
        );
        if (data.msg === "Enabled") {
          setRes32Code(data.base32);
          setResQR(data.qr);
        }
        setStatus(data.msg);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
    return () => {
      setSuperPassword("");
    };
  }, []);

  const getQR = async () => {
    // fetches NEW base32 and qr image only if user two_fa_status ===false
    if (status === "Disabled") {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/totp-show",
          {
            withCredentials: true,
          }
        );
        setRes32Code(data.code);
        setResQR(data.scan);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const superModalSubmit = async (e) => {
    // Verifies the super password
    setSuperPassword("");
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/only-password",
        { password: superPassword },
        {
          withCredentials: true,
        }
      );
      if (data.success === true) {
        setQrModal(true);
        getQR();
      } else console.log(false);
    } catch (error) {
      toast.error("Supper Password Incorrect", {
        autoClose: 3000,
        transition: Flip,
      });
      console.log(error);
    }
  };
  const submit2FA = async (e) => {
    e.preventDefault();
    //  Makes Call to display QR and modify user schema
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/totp-verification",
        { secret_32: res32Code, code: code },
        {
          withCredentials: true,
        }
      );
      if (data === true) {
        setStatus("Enabled");
        toast.success("Enabled", {
          autoClose: 3000,
          transition: Flip,
        });
        await axios.patch(
          "http://localhost:5000/api/user/totp-data-on",
          {
            secret: res32Code,
            qrCode: resQR,
          },
          {
            withCredentials: true,
          }
        );
        setQrModal(false);
        setSuperModal(false);
      } else {
        toast.warn("Wrong Code", {
          autoClose: 3000,
          transition: Slide,
        });
      }
    } catch (err) {
      toast.warn("error Occured, try again later");
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

  const disableTotp = async () => {
    await axios.patch("http://localhost:5000/api/user/totp-data-off", {
      withCredentials: true,
    });
    setStatus("Disabled");
    toast.info("Diasbled!", {
      autoClose: 3000,
      transition: Zoom,
    });
    setQrModal(false);
    setSuperModal(false);
    setSuperPassword("");
  };

  return (
    <>
      <div className="ui-section" id="two-step-login">
        <div className="ui-section__header">
          <h2>Two Step Login</h2>
          <hr />
          <p>This is an additional step to secure your account</p>
          <p>Current Status:{status}</p>
          <button onClick={() => setSuperModal(true)}>Manage</button>
          <br />
        </div>
        <ReactModal
          isOpen={superModal}
          onRequestClose={() => setSuperModal(false)}
          shouldCloseOnOverlayClick={true}
          style={{
            content: {
              position: "static",
              inset: "0px",
              border: "none",
              background: "none",
              visibility: "none",
            },
            overlay: { backgroundColor: "rgb(184 184 184 / 75%)" },
          }}
        >
          <section className="modal__container">
            <span onClick={() => setSuperModal(false)} className="close">
              <FaTimes />
            </span>
            <h3 className="modal__container--title">Confirm Yourself:</h3>
            <form
              onSubmit={superModalSubmit}
              className="modal__container--form"
            >
              <label>Enter Super Password:</label>
              <div>
                <input
                  type="password"
                  id="pswd"
                  required
                  autoFocus
                  value={superPassword}
                  onChange={(e) => setSuperPassword(e.target.value)}
                />
                <span className="eye" onClick={() => togglePassword()}>
                  {eye === true ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="modal__container--form-buttons">
                <button className="change__buttons">Proceed</button>
                <button
                  onClick={() => setSuperModal(false)}
                  className="cancel__buttons"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </ReactModal>
        {/* NEW MODEL */}
        <ReactModal
          isOpen={qrModal}
          onRequestClose={() => setSuperModal(false)}
          shouldCloseOnOverlayClick={true}
          style={{
            content: {
              position: "static",
              inset: "0px",
              border: "none",
              background: "none",
              visibility: "none",
            },
            overlay: { backgroundColor: "rgb(184 184 184 / 75%)" },
          }}
        >
          <section className="modal__container">
            <span
              onClick={() => {
                setSuperModal(false);
                setQrModal(false);
                setSuperPassword("");
              }}
              className="close"
            >
              <FaTimes />
            </span>
            <h3 className="modal__container--title">Two-Step Login</h3>
            {status === "Disabled" ? (
              <p>
                Follow the Steps to setup the process on your authenticator App
              </p>
            ) : (
              <p>
                Two step verification is{" "}
                <b style={{ color: "green" }}>Enbaled</b>, If you wish to add
                another device Follow these steps to Set-up:
              </p>
            )}
            <ul className="instructions">
              <li>Download the App on your device</li>
              <div>
                <li>Scan this QR code with the app</li>
                <div className="qrCode">
                  <img src={resQR} alt="QRCODE"></img>
                </div>
                <div className="tCode">
                  OR Enter this code in App :<p>{res32Code}</p>
                </div>
              </div>
              {status === "Disabled" && (
                <li>Now, enter the 6-digit code displayed in the app </li>
              )}
            </ul>
            {status === "Disabled" ? (
              <form onSubmit={submit2FA} className="two-step-form">
                <label>Enter 6-digit Code:</label>
                <input
                  type="number"
                  required
                  id="code"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <div className="two-fa-form-buttons">
                  <button className="change__buttons">Enable</button>
                  <button
                    onClick={() => {
                      setQrModal(false);
                      setSuperModal(false);
                      setSuperPassword("");
                    }}
                    className="cancel__buttons"
                  >
                    Close
                  </button>
                </div>
              </form>
            ) : (
              <div className="two-fa-form-buttons">
                <button
                  onClick={() => disableTotp()}
                  className="disable-buttons"
                >
                  Disable
                </button>
                <button
                  onClick={() => {
                    setQrModal(false);
                    setSuperModal(false);
                    setSuperPassword("");
                  }}
                  className="cancel__buttons"
                >
                  Close
                </button>
              </div>
            )}
          </section>
        </ReactModal>
      </div>
      <ToastContainer />
    </>
  );
};

export default TwoStepLogin;
