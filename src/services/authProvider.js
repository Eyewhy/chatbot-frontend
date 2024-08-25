import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../api/auth"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
            console.log(res);
            if (res === 'error') return 'error';
            
            setUser(username);
            setToken(res);
            localStorage.setItem("site", res);
            navigate("/home");

            return res;
        });
        return res;
    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    }
    return (
        <AuthContext.Provider value={{ token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

const useAuth = () => { return useContext(AuthContext); };

export default AuthProvider;
export { useAuth };