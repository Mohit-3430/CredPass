import { NavLink } from "react-router-dom";

const SettingsLinks = () => {
  return <>
        <div>
            <div className="settings__menu">
                <div className="settings__menu--header">
                    <p>Settings</p>   
                    <hr style={{width : "15rem"}}/>
                </div>
                <ul className="settings">
                <button><NavLink to="/settings/myaccount">Account</NavLink></button>
                <button><NavLink to="/settings/2fa">MFA</NavLink></button>
                <button><NavLink to="/settings/irreversible-action">Danger</NavLink></button>
                <button>Options</button>
                </ul>
            </div>
        </div>
    </>;
};

export default SettingsLinks;
