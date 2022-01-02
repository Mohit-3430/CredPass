import './styles/HomeApp.css'
import HomeNavbar from './components/HomeNavbar'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContent from './components/HomeContent';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

import Navbar from './components/VaultComponents/Navbar'
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
            <Navbar />
            <HomeVault/>
            </>
          } />
          <Route path = '/vault-create' element = {
            <>
            <Navbar />
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
