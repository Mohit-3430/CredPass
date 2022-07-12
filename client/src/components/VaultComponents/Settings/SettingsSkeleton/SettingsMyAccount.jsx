import { VaultNavbar } from "../../VaultGeneral";
import MyAccount from "../SettingsComponents/MyAccount";
import "../../../../styles/Vault/UI.css";
import SettingsLinks from "../SettingsComponents/SettingsLinks";

const SettingsMyAccount = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <MyAccount />
        </section>
      </section>
    </>
  );
};

export default SettingsMyAccount;
