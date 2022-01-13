import './styles/HomeApp.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContent from './components/HomeContent';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

import HomeVault from './components/VaultComponents/HomeVault';
import CreateVault from './components/VaultComponents/CreateVault';
import Logout from './components/Logout';

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
          <Route path = '/Logout' element = {<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
