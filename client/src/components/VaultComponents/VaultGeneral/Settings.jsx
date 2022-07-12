import VaultNavbar from "./VaultNavbar";
import "../../../styles/Vault/UI.css";
import { SettingsLinks } from "../Settings/SettingsComponents";

const Settings = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
      </section>
    </>
  );
};

export default Settings;
