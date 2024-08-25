import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Auth
import AuthProvider from './services/authProvider'
import PrivateRoute from './services/route';

// Pages
import Login from './pages/login'
import Home from './pages/home'

const backend = 'http://127.0.0.1:8000'

function App() {
  return (
    <div class="bg-dark text-light vw-100 vh-100" data-bs-theme="dark">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>  
          </Routes>
        </AuthProvider>  
      </Router>
      
    </div>
  );
}

export default App; 
export { backend } ;
