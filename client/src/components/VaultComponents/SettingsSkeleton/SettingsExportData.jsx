import React from 'react'
import VaultNavbar from '../VaultNavbar'
import ExportData from '../SettingsComponents/ExportData'
import SettingsLinks from '../SettingsComponents/SettingsLinks'

const SettingsExportData = () => {
  return (
    <>
      <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
            <SettingsLinks />
            <section className="settings-section__container">
                <ExportData />
            </section>
        </section>
    </>
  )
}

export default SettingsExportData