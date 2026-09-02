import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const {
        isAuthenticated,
        isAdmin,
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="navbar">

            <Link to="/" className="brand">
                MOVIE CATALOG
            </Link>

            <nav className="nav-links">

                <Link to="/">
                    Catalog
                </Link>

                {isAdmin && (
                    <Link to="/admin">
                        Admin
                    </Link>
                )}

                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="user-email">
                            {user?.email}
                        </span>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="button button-outline"
                        >
                            Logout
                        </button>
                    </>
                )}

            </nav>

        </header>
    );
};

export default Navbar;