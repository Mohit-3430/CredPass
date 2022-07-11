import "./styles/HomeApp.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomeContent,
  LoginForm,
  SignupForm,
  Totp,
  ForgotPassword,
  ResetPassword,
  Logout,
  HomeVault,
  CreateVault,
} from "./components/";

import {
  Settings,
  SettingsMyAccount,
  Settings2Fa,
  SettingsIrreversible,
  SettingsExportData,
} from "./components/";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login-totp" element={<Totp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:emailId/:token"
            element={<ResetPassword />}
          />

          <Route path="/vault-home" element={<HomeVault />} />
          <Route path="/vault-create" element={<CreateVault />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/myaccount" element={<SettingsMyAccount />} />
          <Route path="/settings/2fa" element={<Settings2Fa />} />
          <Route
            path="/settings/irreversible-action"
            element={<SettingsIrreversible />}
          />
          <Route
            path="/settings/export-data"
            element={<SettingsExportData />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
