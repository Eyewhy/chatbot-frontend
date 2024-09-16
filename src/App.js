import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Auth
import AuthProvider from './services/authProvider'
import PrivateRoute from './services/route';

// Pages
import LoginPage from './pages/login'
import ForgotPasswordPage from './pages/forgotPassword';
import ForgotPasswordConfirmPage from './pages/forgotPasswordConfirm';

import ChatPage from './pages/chats';
import ChatDetail from './pages/chatDetail';
import HelperPage from './pages/helper';
import HelperDetail from './pages/helperDetail';
import QnaPage from './pages/qna';
import ReferralPage from './pages/referral';
import AccountPage from './pages/account';

import Navbar from './components/navbar';

import React, { useState } from 'react';


const backend = 'http://54.151.186.26'

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
                <Route element={<PrivateRoute />}>
                  <Route path="/chats" element={<ChatPage setActivePage={setActivePage}/>} >
                  </Route>
                  <Route path="/chats/:id" element={<ChatDetail setActivePage={setActivePage}/>} >
                  </Route>
                  <Route path="/helper" element={<HelperPage setActivePage={setActivePage}/>} />
                  <Route path="/helper/:id" element={<HelperDetail setActivePage={setActivePage}/>} />
                  <Route path="/qna" element={<QnaPage setActivePage={setActivePage}/>} />
                  <Route path="/referral" element={<ReferralPage setActivePage={setActivePage}/>} />
                  <Route path="/account" element={<AccountPage setActivePage={setActivePage}/>} />
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
