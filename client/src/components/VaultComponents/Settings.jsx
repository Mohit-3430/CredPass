import VaultNavbar from "./VaultNavbar"
import "../../styles/Settings.css"
import { Link } from "react-router-dom";
// import TwoStepLogin from "./SettingsComponents/TwoStepLogin";
// import IrreversibleStuff from "./SettingsComponents/IrreversibleStuff";

const Settings = () => {
    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
        <div>
            <div className="settings__menu">
                <div className="settings__menu--header">
                    <p>Settings</p>   
                    <hr />
                </div>
                <ul className="settings">
                    <li><Link to="/settings/myaccount">My account</Link></li>
                    <li><Link to="/settings/2fa">Two-Step Login</Link></li>
                    <li><Link to="/settings/irreversible-action">Irreversible Actions</Link></li>
                    <li>Options</li>
                </ul>
            </div>
            </div>
            <section className="settings-section__container">
                {/* <MyAccount /> */}
                {/* <TwoStepLogin />
                <IrreversibleStuff /> */}
            </section>
        </section>
        </>
    )
}

export default Settings;