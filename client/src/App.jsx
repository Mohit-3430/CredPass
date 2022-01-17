import './styles/HomeApp.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContent from './components/HomeContent';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

import HomeVault from './components/VaultComponents/HomeVault';
import CreateVault from './components/VaultComponents/CreateVault';
import Logout from './components/Logout';
import Settings from './components/VaultComponents/Settings';
import SettingsMyAccount from './components/VaultComponents/SettingsComponents/SettingsMyAccount';
import Settings2Fa from './components/VaultComponents/SettingsComponents/Settings2FA';
import SettingsIrreversible from './components/VaultComponents/SettingsComponents/SettingsIrreversible';

const App =() =>  {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = {<HomeContent />}/>
          <Route path = '/login' element = {<LoginForm />}/>
          <Route path = '/signup' element = {<SignupForm />}/>
          
          <Route path = '/vault-home' element = {<HomeVault/>} />
          <Route path = '/vault-create' element = {<CreateVault/>} />
          <Route path = '/logout' element = {<Logout />} />

          <Route path = '/settings' element = {<Settings />} />
          <Route path = '/settings/myaccount' element = {<SettingsMyAccount />} />
          <Route path = '/settings/2fa' element = {<Settings2Fa />} />
          <Route path = '/settings/irreversible-action' element = {<SettingsIrreversible />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
