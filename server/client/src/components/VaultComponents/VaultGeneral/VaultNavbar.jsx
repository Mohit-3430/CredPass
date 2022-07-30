import "../../../styles/Navbar/VaultNavbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useAuth } from "../../../Context";

const VaultNavbar = () => {
  const [showNav, setShowNav] = useState("hide");
  const [bars, setBars] = useState(true);
  const [extraMenu, setExtraMenu] = useState(false);
  const [caret, setCaret] = useState("down");
  const auth = useAuth();

  const toggleNav = () => {
    if (showNav === "hide") {
      setShowNav("show");
      setBars(false);
    } else {
      setShowNav("hide");
      setBars(true);
    }
  };
  const extraMenuToggle = () => {
    if (extraMenu === true) {
      setCaret("down");
      setExtraMenu(false);
    } else {
      setCaret("up");
      setExtraMenu(true);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__brand">
          <NavLink to="/vault/all-items">CredPass</NavLink>
          <span onClick={() => toggleNav()}>
            {bars === true ? <FaBars /> : <FaTimes />}
          </span>
        </div>
        <div className={`nav__links ${showNav}`}>
          <ul>
            <li onClick={() => toggleNav()}>
              <NavLink to="/vault/all-items">Home</NavLink>
            </li>
            <li onClick={() => toggleNav()}>
              <NavLink to="/vault-create">Add</NavLink>
            </li>
            <div className="extra__menu">
              <li onClick={() => extraMenuToggle()}>
                Dashboard {caret === "down" ? <FaCaretDown /> : <FaCaretUp />}
                {extraMenu && (
                  <ul>
                    <div className="toggle--extra__menu">
                      <li className="user__name">
                        <NavLink to="#">@ {auth.superUser}</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <FaUser /> Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/settings">
                          <IoSettings /> Settings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/logout">
                          <FaSignOutAlt /> Logout
                        </NavLink>
                      </li>
                    </div>
                  </ul>
                )}
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default VaultNavbar;
