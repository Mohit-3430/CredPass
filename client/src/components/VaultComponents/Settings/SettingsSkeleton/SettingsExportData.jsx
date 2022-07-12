import React from "react";
import { VaultNavbar } from "../../VaultGeneral";
import { ExportData, SettingsLinks } from "../SettingsComponents";

const SettingsExportData = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <ExportData />
        </section>
      </section>
    </>
  );
};

export default SettingsExportData;
