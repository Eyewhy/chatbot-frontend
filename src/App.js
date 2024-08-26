import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Auth
import AuthProvider from './services/authProvider'
import PrivateRoute from './services/route';

// Pages
import LoginPage from './pages/login'
import HomePage from './pages/home'
import ChatPage from './pages/chats';
import HelperPage from './pages/helper';
import QnaPage from './pages/qna';
import ReferralPage from './pages/referral';


const backend = 'http://127.0.0.1:8000'

function App() {
  return (
    <div class="bg-dark text-light vw-100 vh-100" data-bs-theme="dark">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="/helper" element={<HelperPage />} />
              <Route path="/qna" element={<QnaPage />} />
              <Route path="/referral" element={<ReferralPage />} />
            </Route>  
          </Routes>
        </AuthProvider>  
      </Router>
    </div>
  );
}

export default App; 
export { backend } ;
