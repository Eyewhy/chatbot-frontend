import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Auth
import AuthProvider from './services/authProvider'
import { PrivateRoute, AdminRoute } from './services/route';

import ShortlistProvider from './services/shortlistProvider';

// Pages
// login not required
import LoginPage from './pages/account/login'
import ForgotPasswordPage from './pages/account/forgotPassword';
import ForgotPasswordConfirmPage from './pages/account/forgotPasswordConfirm';
import CreateAccountPage from './pages/account/createAccount';
import ConfirmAccountPage from './pages/account/confirmAccount';

// login required
import AccountPage from './pages/account/account';
import OrganizationPage from './pages/admin/organization';
import JoinOrganizationPage from './pages/admin/joinOrganization';

// search site
import HelperSearch from './pages/helperSearch';
import HelperBiodata from './pages/helperBiodata';
import HelperShortlist from './pages/helperShortlist';
import AgencySearch from './pages/agencySearch';
import AgencyData from './pages/agency';

// admin
import AdminPage from './pages/admin/admin';
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
    width:'70%',
    [theme.breakpoints.down('lg')]: {
      paddingLeft:'2%',
      paddingRight:'2%',
      width:'96%'
    },
  }))

  return (
    <div>
      <Router>
        <AuthProvider><ShortlistProvider>
          <Navbar/>
          <Box component="main" sx={{width:'100vw'}}>
            <MainBox>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/reset" element={<ForgotPasswordPage />} />
                <Route path="/reset/confirm/:uid/:token" element={<ForgotPasswordConfirmPage />}/>
                <Route path="/create" element={<CreateAccountPage />}/>
                <Route path="/create/confirm/:keyy" element={<ConfirmAccountPage />}/>

                <Route path="/search" element={<HelperSearch/>} />
                <Route path="/biodata/:id" element={<HelperBiodata />}/>
                <Route path="/organization" element={<AgencySearch />}/>
                <Route path="/organization/:id" element={<AgencyData />}/>
                <Route path="/shortlist" element={<HelperShortlist />}/>

                <Route element={<PrivateRoute />}>
                  <Route path="/account" element={<AccountPage/>} />
                  <Route path="/admin/join" element={<JoinOrganizationPage/>} />
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/organization" element={<OrganizationPage/>} />
                    <Route path="/admin/chats" element={<ChatPage/>} />
                    <Route path="/admin/chats/:id" element={<ChatDetail/>} />
                    <Route path="/admin/helper" element={<HelperPage/>} />
                    <Route path="/admin/helper/:id" element={<HelperDetail/>} />
                    <Route path="/admin/qna" element={<QnaPage/>} />
                    <Route path="/admin/referral" element={<ReferralPage/>} />
                  </Route>
                </Route>  
              </Routes>  
          </MainBox></Box>
        </ShortlistProvider></AuthProvider>
      </Router>
      <ToastContainer theme="light"/>
    </div>
  );
}

export default App; 
export { backend } ;
