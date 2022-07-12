import { VaultNavbar } from "../../VaultGeneral";
import { TwoStepLogin, SettingsLinks } from "../SettingsComponents";
import "../../../../styles/Vault/UI.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Settings2Fa = () => {
  const [superUser, setSuperUser] = useState("");

  useEffect(() => {
    const fetchSuperUserName = () => {
      axios
        .get(`http://localhost:5000/api/vault-data/`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setSuperUser(res.data.user);
        })
        .catch((err) => console.log(`${err}`));
    };
    fetchSuperUserName();
  }, []);

  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <TwoStepLogin superUser={superUser} />
        </section>
      </section>
    </>
  );
};

export default Settings2Fa;
