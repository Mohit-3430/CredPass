import './styles/HomeApp.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContent from './components/HomeComponents/HomeContent'
import LoginForm from './components/HomeComponents/LoginForm'
import SignupForm from './components/HomeComponents/SignupForm'
import HomeVault from './components/VaultComponents/HomeVault';
import CreateVault from './components/VaultComponents/CreateVault';
import Logout from './components/HomeComponents/Logout';
import Totp from './components/HomeComponents/Totp';

import Settings from './components/VaultComponents/Settings';
import SettingsMyAccount from './components/VaultComponents/SettingsSkeleton/SettingsMyAccount';
import Settings2Fa from './components/VaultComponents/SettingsSkeleton/Settings2FA';
import SettingsIrreversible from './components/VaultComponents/SettingsSkeleton/SettingsIrreversible';
import SettingsExportData from './components/VaultComponents/SettingsSkeleton/SettingsExportData';

const App =() =>  {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = {<HomeContent />}/>
          <Route path = '/signup' element = {<SignupForm />}/>
          <Route path = '/login' element = {<LoginForm />}/>
          <Route path = '/login-totp' element = {<Totp />}/>
          
          <Route path = '/vault-home' element = {<HomeVault/>} />
          <Route path = '/vault-create' element = {<CreateVault/>} />
          <Route path = '/logout' element = {<Logout />} />

          <Route path = '/settings' element = {<Settings />} />
          <Route path = '/settings/myaccount' element = {<SettingsMyAccount />} />
          <Route path = '/settings/2fa' element = {<Settings2Fa />} />
          <Route path = '/settings/irreversible-action' element = {<SettingsIrreversible />} />
          <Route path = '/settings/export-data' element = {<SettingsExportData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
