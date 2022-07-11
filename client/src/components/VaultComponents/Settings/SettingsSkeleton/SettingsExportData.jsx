import React from "react";
import { VaultNavbar } from "../../VaultGeneral";
import { ExportData, SettingsLinks } from "../SettingsComponents";

const SettingsExportData = () => {
  return (
    <>
      <VaultNavbar />
      <section className="settings__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="settings-section__container">
          <ExportData />
        </section>
      </section>
    </>
  );
};

export default SettingsExportData;
