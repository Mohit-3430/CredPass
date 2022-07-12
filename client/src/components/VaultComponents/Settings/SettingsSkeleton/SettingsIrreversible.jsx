import { VaultNavbar } from "../../VaultGeneral";
import "../../../../styles/Vault/UI.css";
import IrreversibleStuff from "../SettingsComponents/IrreversibleStuff";
import SettingsLinks from "../SettingsComponents/SettingsLinks";

const SettingsIrreversible = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <IrreversibleStuff />
        </section>
      </section>
    </>
  );
};

export default SettingsIrreversible;
