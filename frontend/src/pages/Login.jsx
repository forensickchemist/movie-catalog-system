import { useState } from "react";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
    const {
        login,
        isAuthenticated
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(
                form.email,
                form.password
            );

            const destination =
                location.state?.from || "/";

            navigate(destination, {
                replace: true
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">

            <div className="auth-card">

                <p className="eyebrow">
                    WELCOME BACK
                </p>

                <h1>Sign in</h1>

                <ErrorMessage message={error} />

                <form onSubmit={handleSubmit}>

                    <label>
                        Email

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Password

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="button button-full"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </section>
    );
};

export default Login;