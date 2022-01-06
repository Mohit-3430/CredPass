import './styles/HomeApp.css'
import VaultNavbar from './components/VaultComponents/VaultNavbar'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContent from './components/HomeContent';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

import HomeNavbar from './components/HomeNavbar'
import HomeVault from './components/VaultComponents/HomeVault';
import CreateVault from './components/VaultComponents/CreateVault';
import Logout from './components/Logout';

const App =() =>  {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = {
            <>
              <HomeNavbar />
              <HomeContent />
            </>
          }/>
          <Route path = '/login' element = {
            <>
              <HomeNavbar />
              <LoginForm />
            </>
          }/>
          <Route path = '/signup' element = {
            <>
              <HomeNavbar />
              <SignupForm />
            </>
          }/>
          <Route path = '/vault-home' element = {
            <>
            <VaultNavbar />
            <HomeVault/>
            </>
          } />
          <Route path = '/vault-create' element = {
            <>
            <VaultNavbar />
            <CreateVault/>
            </>
          } />
          <Route path = '/Logout' element = {<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
