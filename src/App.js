import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Auth
import AuthProvider from './services/authProvider'
import PrivateRoute from './services/route';

// Pages
// login not required
import LoginPage from './pages/account/login'
import ForgotPasswordPage from './pages/account/forgotPassword';
import ForgotPasswordConfirmPage from './pages/account/forgotPasswordConfirm';
import CreateAccountPage from './pages/account/createAccount';

// login required
import AccountPage from './pages/account/account';
import OrganizationPage from './pages/admin/organization';
import JoinOrganizationPage from './pages/admin/joinOrganization';

// search site
import HelperSearch from './pages/helperSearch';
import HelperBiodata from './pages/helperBiodata';
import AgencyData from './pages/agency';

// admin
import ChatPage from './pages/admin/chats';
import ChatDetail from './pages/admin/chatDetail';
import HelperPage from './pages/admin/helper';
import HelperDetail from './pages/admin/helperDetail';
import QnaPage from './pages/admin/qna';
import ReferralPage from './pages/admin/referral';

import Navbar from './components/navbar';

import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const backend = 'https://backend.acei.com.sg'

function App() {
  const MainBox = styled(Box)(({theme}) => ({
    paddingLeft: '15%',
    paddingRight: '15%',
    width:'100%',
    [theme.breakpoints.down('lg')]: {
      paddingLeft:'1%',
      paddingRight:'1%',
    },
  }))

  return (
    <div class="" data-bs-theme="light">
      <Router>
        <AuthProvider>
          <Navbar/>
          <main>
            <MainBox>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/reset" element={<ForgotPasswordPage />} />
                <Route path="/reset/confirm/:uid/:token" element={<ForgotPasswordConfirmPage />}/>
                <Route path="/create" element={<CreateAccountPage />}/>

                <Route path="/search" element={<HelperSearch/>} />
                <Route path="/biodata/:id" element={<HelperBiodata />}/>
                <Route path="/organization/:id" element={<AgencyData />}/>

                <Route element={<PrivateRoute />}>
                  <Route path="/account" element={<AccountPage/>} />
                  <Route path="/organization" element={<OrganizationPage/>} />
                  <Route path="/join" element={<JoinOrganizationPage/>} />
                  <Route path="/chats" element={<ChatPage/>} />
                  <Route path="/chats/:id" element={<ChatDetail/>} />
                  <Route path="/helper" element={<HelperPage/>} />
                  <Route path="/helper/:id" element={<HelperDetail/>} />
                  <Route path="/qna" element={<QnaPage/>} />
                  <Route path="/referral" element={<ReferralPage/>} />
                </Route>  
              </Routes>  
            </MainBox>  
          </main>
        </AuthProvider>
      </Router>
      <ToastContainer theme="light"/>
    </div>
  );
}

export default App; 
export { backend } ;
