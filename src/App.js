import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Auth
import AuthProvider from './services/authProvider'
import PrivateRoute from './services/route';

// Pages
// login not required
import LoginPage from './pages/admin/account/login'
import ForgotPasswordPage from './pages/admin/account/forgotPassword';
import ForgotPasswordConfirmPage from './pages/admin/account/forgotPasswordConfirm';
import CreateAccountPage from './pages/admin/account/createAccount';

// login required
import AccountPage from './pages/admin/account/account';
import OrganizationPage from './pages/admin/account/organization';
import JoinOrganizationPage from './pages/admin/account/joinOrganization';

// Actually useful
import ChatPage from './pages/admin/chats';
import ChatDetail from './pages/admin/chatDetail';
import HelperPage from './pages/admin/helper';
import HelperDetail from './pages/admin/helperDetail';
import QnaPage from './pages/admin/qna';
import ReferralPage from './pages/admin/referral';

import Navbar from './components/navbar';

import React, { useState } from 'react';


const backend = 'https://backend.acei.com.sg'

function App() {
  const [activePage, setActivePage] = useState("");
  return (
    <div class="bg-dark text-light" data-bs-theme="dark">
      <Router>
        <AuthProvider>
          <Navbar active={activePage}/>
          <main class="d-flex justify-content-center">
            <div class="w-75">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/reset" element={<ForgotPasswordPage />} />
                <Route path="/reset/confirm/:uid/:token" element={<ForgotPasswordConfirmPage />}/>
                <Route path="/create" element={<CreateAccountPage />}/>

                <Route element={<PrivateRoute />}>
                  <Route path="/account" element={<AccountPage setActivePage={setActivePage}/>} />
                  <Route path="/organization" element={<OrganizationPage setActivePage={setActivePage}/>} />
                  <Route path="/join" element={<JoinOrganizationPage setActivePage={setActivePage}/>} />

                  <Route path="/chats" element={<ChatPage setActivePage={setActivePage}/>} >
                  </Route>
                  <Route path="/chats/:id" element={<ChatDetail setActivePage={setActivePage}/>} >
                  </Route>
                  <Route path="/helper" element={<HelperPage setActivePage={setActivePage}/>} />
                  <Route path="/helper/:id" element={<HelperDetail setActivePage={setActivePage}/>} />
                  <Route path="/qna" element={<QnaPage setActivePage={setActivePage}/>} />
                  <Route path="/referral" element={<ReferralPage setActivePage={setActivePage}/>} />
                </Route>  
              </Routes>  
            </div>  
          </main>
        </AuthProvider>
      </Router>
      <ToastContainer theme="dark"/>
    </div>
  );
}

export default App; 
export { backend } ;
