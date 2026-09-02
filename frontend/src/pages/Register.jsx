import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    registerUser
} from "../services/authService";

import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

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
        setSuccess("");

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await registerUser(
                form.email,
                form.password
            );

            setSuccess(
                "Registration successful. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);
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
                    JOIN THE CATALOG
                </p>

                <h1>Create account</h1>

                <ErrorMessage message={error} />

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

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
                            minLength={8}
                            required
                        />
                    </label>

                    <label>
                        Confirm password

                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            minLength={8}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="button button-full"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                </form>

                <p>
                    Already registered?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

            </div>

        </section>
    );
};

export default Register;