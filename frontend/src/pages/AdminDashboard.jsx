import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";

import {
    getMovies,
    deleteMovie,
    getCurrentFeatured,
    setFeatured
} from "../services/movieService";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [featuredLoading, setFeaturedLoading] =
        useState(true);

    const [savingFeatured, setSavingFeatured] =
        useState(false);

    const [featuredError, setFeaturedError] =
        useState("");

    const now = new Date();

    const [featuredMonth, setFeaturedMonth] =
        useState(now.getMonth() + 1);

    const [featuredYear, setFeaturedYear] =
        useState(now.getFullYear());

    const loadMovies = async () => {
        try {
            const data = await getMovies();

            setMovies(data.movies || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadFeatured = async () => {
        setFeaturedLoading(true);
        setFeaturedError("");

        try {
            const data =
                await getCurrentFeatured();

            setFeaturedMovies(
                data.movies?.map(
                    (movie) => movie._id
                ) || []
            );
        } catch (err) {
            // A 404 simply means no featured films
            // have been configured yet.
            setFeaturedMovies([]);
        } finally {
            setFeaturedLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
        loadFeatured();
    }, []);

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this movie?"
            );

        if (!confirmed) {
            return;
        }

        try {
            await deleteMovie(id);

            setMovies((current) =>
                current.filter(
                    (movie) => movie._id !== id
                )
            );

            setFeaturedMovies((current) =>
                current.filter(
                    (movieId) => movieId !== id
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFeaturedToggle = (movieId) => {
        setFeaturedError("");

        setFeaturedMovies((current) => {
            if (current.includes(movieId)) {
                return current.filter(
                    (id) => id !== movieId
                );
            }

            if (current.length >= 3) {
                setFeaturedError(
                    "You can select exactly 3 featured films."
                );

                return current;
            }

            return [
                ...current,
                movieId
            ];
        });
    };

    const handleSaveFeatured = async () => {
        if (featuredMovies.length !== 3) {
            setFeaturedError(
                "Please select exactly 3 featured films."
            );

            return;
        }

        setSavingFeatured(true);
        setFeaturedError("");

        try {
            await setFeatured(
                featuredYear,
                featuredMonth,
                featuredMovies
            );
        } catch (err) {
            setFeaturedError(err.message);
        } finally {
            setSavingFeatured(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section>

            <div className="admin-header">

                <div>
                    <p className="eyebrow">
                        ADMIN
                    </p>

                    <h1>Movie Dashboard</h1>
                </div>

                <Link
                    to="/admin/movies/add"
                    className="button"
                >
                    Add Movie
                </Link>

            </div>

            <ErrorMessage message={error} />

            <section className="featured-admin">

                <div className="section-heading">

                    <div>
                        <p className="eyebrow">
                            FEATURED FILMS
                        </p>

                        <h2>
                            Monthly Selection
                        </h2>
                    </div>

                    <p>
                        Select three films to feature
                        this month.
                    </p>

                </div>

                <div className="featured-admin-controls">

                    <label>
                        Month

                        <select
                            value={featuredMonth}
                            onChange={(event) =>
                                setFeaturedMonth(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        >
                            <option value={1}>
                                January
                            </option>

                            <option value={2}>
                                February
                            </option>

                            <option value={3}>
                                March
                            </option>

                            <option value={4}>
                                April
                            </option>

                            <option value={5}>
                                May
                            </option>

                            <option value={6}>
                                June
                            </option>

                            <option value={7}>
                                July
                            </option>

                            <option value={8}>
                                August
                            </option>

                            <option value={9}>
                                September
                            </option>

                            <option value={10}>
                                October
                            </option>

                            <option value={11}>
                                November
                            </option>

                            <option value={12}>
                                December
                            </option>
                        </select>
                    </label>

                    <label>
                        Year

                        <input
                            type="number"
                            value={featuredYear}
                            onChange={(event) =>
                                setFeaturedYear(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        />
                    </label>

                    <span className="featured-count">
                        {featuredMovies.length} / 3 selected
                    </span>

                </div>

                <ErrorMessage
                    message={featuredError}
                />

                {featuredLoading ? (
                    <Loading />
                ) : (
                    <div className="featured-selector">

                        {movies.map((movie) => {
                            const isSelected =
                                featuredMovies.includes(
                                    movie._id
                                );

                            return (
                                <button
                                    key={movie._id}
                                    type="button"
                                    className={`featured-selector-card ${
                                        isSelected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleFeaturedToggle(
                                            movie._id
                                        )
                                    }
                                >

                                    <div className="featured-selector-poster">

                                        {movie.poster?.url ? (
                                            <img
                                                src={
                                                    movie.poster.url
                                                }
                                                alt=""
                                            />
                                        ) : (
                                            <span>
                                                No poster
                                            </span>
                                        )}

                                    </div>

                                    <div className="featured-selector-info">

                                        <strong>
                                            {movie.title}
                                        </strong>

                                        <span>
                                            {movie.year}
                                        </span>

                                    </div>

                                    {isSelected && (
                                        <span className="featured-selected">
                                            Selected
                                        </span>
                                    )}

                                </button>
                            );
                        })}

                    </div>
                )}

                <div className="featured-admin-actions">

                    <button
                        type="button"
                        className="button"
                        onClick={handleSaveFeatured}
                        disabled={
                            savingFeatured ||
                            featuredMovies.length !== 3
                        }
                    >
                        {savingFeatured
                            ? "Saving..."
                            : "Save Featured Films"}
                    </button>

                </div>

            </section>

            <div className="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {movies.map((movie) => (
                            <tr key={movie._id}>

                                <td>
                                    {movie.title}
                                </td>

                                <td>
                                    {movie.director}
                                </td>

                                <td>
                                    {movie.year}
                                </td>

                                <td>
                                    {movie.genre?.join(", ")}
                                </td>

                                <td className="table-actions">

                                    <Link
                                        to={`/movies/${movie._id}`}
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/admin/movies/edit/${movie._id}`}
                                    >
                                        Update
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                movie._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
};

export default AdminDashboard;
