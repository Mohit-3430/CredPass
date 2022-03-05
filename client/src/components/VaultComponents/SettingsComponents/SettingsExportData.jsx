import React from 'react'
import VaultNavbar from '../VaultNavbar'
import ExportData from './ExportData'
import SettingsLinks from './SettingsLinks'

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