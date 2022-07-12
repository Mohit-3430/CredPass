import { VaultNavbar } from "../../VaultGeneral";
import { VaultLinks, AllVault } from "../../VaultMain/Components";
import "../../../../styles/Vault/UI.css";

const VskAllItems = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
        <section className="ui-section__container">
          <AllVault />
        </section>
      </section>
    </>
  );
};

export default VskAllItems;
