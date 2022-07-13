import { VaultNavbar } from "../../VaultGeneral";
import { VaultLinks, Trash } from "../Components";
import "../../../../styles/Vault/UI.css";

const VskTrash = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
        <section className="ui-section__container">
          <Trash />
        </section>
      </section>
    </>
  );
};

export default VskTrash;
