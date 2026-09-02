import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";

import {
    getMovies,
    deleteMovie
} from "../services/movieService";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        loadMovies();
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
        } catch (err) {
            setError(err.message);
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
                                            handleDelete(movie._id)
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