import VaultNavbar from "../VaultNavbar"
import MyAccount from "./MyAccount"
import "../../../styles/Settings.css"
import SettingsLinks from "./SettingsLinks"

const SettingsMyAccount = () => {

    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
            <SettingsLinks />
            <section className="settings-section__container">
                <MyAccount />
            </section>
        </section>
        </>
    )
}

export default SettingsMyAccount;