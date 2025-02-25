import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginRequest, logoutRequest, userRequest } from "../api/auth"
import { publicOrganizationRequest } from "../api/public";
import { websiteVersion, websites } from "../App";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [organization, setOrganization] = useState(Number(localStorage.getItem("organization")) || 0);

    const navigate = useNavigate();

    /**
     * Logs in and stores state.
     * @param { string } username 
     * @param { string } password 
     * @returns { string } token || 'error'
     */
    const login = async (username, password) => {
        const res = await loginRequest(username, password);
        if (res === 'error') return 'error';

        // set token 1st to allow for userRequest
        setToken(res);
        localStorage.setItem("site", res);
        const userInfo = await userRequest();

        // user has organization, is an 'admin' user
        if (userInfo['organization']) {
            await publicOrganizationRequest(userInfo['organization']).then((org) => {
                // check if using the right site
                if (org['organization_type'] !== websiteVersion) {
                    // clear token if wrong website
                    clearToken();
                    window.location.href = websites[org['organization_type']];
                }
                navigate('/admin/chats');
            });
        }

        // user has no organization, is a regular visitor
        if (userInfo['organization'] === 0) {
            // deny access if chatbot 
            if (websiteVersion === 'chatbot') {
                clearToken();
                window.location.href = websites['helper_agency'];
            }
            navigate('/search');
        }

        setUser(username);
        localStorage.setItem("user", username);

        setOrganization(userInfo['organization']);
        localStorage.setItem("organization", userInfo['organization']);

        return res;
    }

    const logout = async () => {
        await logoutRequest().then(() => {
            clearToken();
            setUser(null);
            setOrganization(false);
            localStorage.removeItem("user");
            localStorage.setItem("organization", 0);
            navigate("/login");
        }) 
    }

    const clearToken = () => {
        setToken("");
        localStorage.removeItem("site");
    }

    const checkLoggedIn = () => {
        return (token === "") ? false : true;
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, checkLoggedIn, organization }}>
            {children}
        </AuthContext.Provider>
    );

};

const getToken = () => { return localStorage.getItem("site")};
/**
 * methods: .token, .user, .login(), .logout(), .checkLoggedIn(), .getUserInfo(), .organization
 */
const useAuth = () => { return useContext(AuthContext); };

export default AuthProvider;
export { useAuth, getToken };