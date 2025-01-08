import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginRequest, logoutRequest, userRequest } from "../api/auth"
import { publicOrganizationRequest } from "../api/public";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [organization, setOrganization] = useState(Number(localStorage.getItem("organization")) || 0);
    const [orgType, setOrgType] = useState(localStorage.getItem("org_type") || "");
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

        setUser(username);
        setToken(res);
        localStorage.setItem("site", res);
        localStorage.setItem("user", username);

        const userInfo = await userRequest();

        setOrganization(userInfo['organization']);
        localStorage.setItem("organization", userInfo['organization']);

        if (userInfo['organization']) {
            await publicOrganizationRequest(userInfo['organization']).then((org) => {
                setOrgType(org['organization_type']);
                localStorage.setItem('org_type', org['organization_type']);
                navigate('/admin/chats');
            });
        } else navigate('/search');

        window.dispatchEvent(new Event('storage'));
        return res;
    }

    const logout = async () => {
        await logoutRequest().then(() => {
            setUser(null);
            setToken("");
            setOrganization(false);
            localStorage.removeItem("site");
            localStorage.removeItem("user");
            localStorage.setItem("organization", 0);
            localStorage.setItem("org_type", '');
            window.dispatchEvent(new Event('storage'));
            navigate("/");
        }) 
    }

    const checkLoggedIn = () => {
        return (token === "") ? false : true;
    }

    const getOrganization = () => { return localStorage.getItem('organization'); };
    const getOrgType = () => { return localStorage.getItem('org_type'); };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, checkLoggedIn, getOrganization, getOrgType }}>
            {children}
        </AuthContext.Provider>
    );

};

const getToken = () => { return localStorage.getItem("site")};
const getOrgType = () => {return localStorage.getItem("org_type")};
/**
 * methods: .token, .user, .login(), .logout(), .checkLoggedIn(), .getUserInfo(), getOrganization
 */
const useAuth = () => { return useContext(AuthContext); };

export default AuthProvider;
export { useAuth, getToken, getOrgType };