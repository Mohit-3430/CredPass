import VaultNavbar from "../VaultNavbar"
import "../../../styles/Settings.css"
import IrreversibleStuff from "../SettingsComponents/IrreversibleStuff"
import SettingsLinks from "../SettingsComponents/SettingsLinks"

const SettingsIrreversible = () => {

    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
        <SettingsLinks />
            <section className="settings-section__container">
                <IrreversibleStuff />
            </section>
        </section>
        </>
    )
}

export default SettingsIrreversible;