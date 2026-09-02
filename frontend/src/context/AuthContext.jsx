import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    loginUser,
    getCurrentUser
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem("access");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const data = await getCurrentUser();
            setUser(data.user);
        } catch {
            localStorage.removeItem("access");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        const data = await loginUser(email, password);

        localStorage.setItem("access", data.access);

        const currentUser = await getCurrentUser();

        setUser(currentUser.user);
    };

    const logout = () => {
        localStorage.removeItem("access");
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        isAdmin: user?.isAdmin === true,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};