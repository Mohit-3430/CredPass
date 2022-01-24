import VaultNavbar from "./VaultNavbar"
import "../../styles/Settings.css"
import SettingsLinks from "./SettingsComponents/SettingsLinks";

const Settings = () => {
    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
            <SettingsLinks />
        </section>
        </>
    )
}

export default Settings;