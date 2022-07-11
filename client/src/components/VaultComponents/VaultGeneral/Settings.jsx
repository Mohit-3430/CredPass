import VaultNavbar from "./VaultNavbar";
import "../../../styles/Vault/Settings.css";
import { SettingsLinks } from "../Settings/SettingsComponents";

const Settings = () => {
  return (
    <>
      <VaultNavbar />
      <section className="settings__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
      </section>
    </>
  );
};

export default Settings;
