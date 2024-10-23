import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginRequest, logoutRequest } from "../api/auth"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user" || null));
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    /**
     * Logs in and stores state.
     * @param { string } username 
     * @param { string } password 
     * @returns { string } token || 'error'
     */
    const login = async (username, password) => {
        const res = await loginRequest(username, password).then((res) => {
            if (res === 'error') return 'error';
            
            setUser(username);
            setToken(res);
            localStorage.setItem("site", res);
            localStorage.setItem("user", username);
            navigate("/referral");

            return res;
        });
        return res;
    }

    const logout = async () => {
        const res = await logoutRequest().then((res) => {
            setUser(null);
            setToken("");
            localStorage.removeItem("site");
            localStorage.removeItem("user");
            navigate("/");
        }) 
    }

    const checkLoggedIn = () => {
        return (token === "") ? false : true;
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, checkLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );

};

const getToken = () => { return localStorage.getItem("site")}
/**
 * methods: .token, .user, .login(), .logout(), .checkLoggedIn()
 */
const useAuth = () => { return useContext(AuthContext); };

export default AuthProvider;
export { useAuth, getToken };