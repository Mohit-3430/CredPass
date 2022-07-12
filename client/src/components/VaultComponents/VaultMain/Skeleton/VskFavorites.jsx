import { VaultNavbar } from "../../VaultGeneral";
import { VaultLinks, Favorites } from "../../VaultMain/Components";
import "../../../../styles/Vault/UI.css";

const VskFavorites = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
        <section className="ui-section__container">
          <Favorites />
        </section>
      </section>
    </>
  );
};

export default VskFavorites;
