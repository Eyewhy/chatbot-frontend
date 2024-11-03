import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginRequest, logoutRequest, userRequest } from "../api/auth"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user" || null));
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [userInfo, setUserInfo] = useState({});
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
            navigate("/search");

            return res;
        });
        setUserInfo(await userRequest());
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

    const isAdmin = () => { return userInfo['is_admin']; };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, checkLoggedIn, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );

};

const getToken = () => { return localStorage.getItem("site")}
/**
 * methods: .token, .user, .login(), .logout(), .checkLoggedIn(), .getUserInfo()
 */
const useAuth = () => { return useContext(AuthContext); };

export default AuthProvider;
export { useAuth, getToken };