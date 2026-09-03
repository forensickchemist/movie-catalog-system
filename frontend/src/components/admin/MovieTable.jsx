import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    getMovies,
    deleteMovie
} from "../../services/movieService";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const MovieTable = ({
    onMovieDeleted
}) => {
    const [movies, setMovies] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [sortField, setSortField] =
        useState("title");

    const [sortDirection, setSortDirection] =
        useState("asc");

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await getMovies();

                setMovies(
                    data.movies || []
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    /* ==============================
       Table Sorting
       ============================== */

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((current) =>
                current === "asc"
                    ? "desc"
                    : "asc"
            );

            return;
        }

        setSortField(field);
        setSortDirection("asc");
    };

    const sortedMovies = useMemo(() => {
        return [...movies].sort((a, b) => {
            let valueA;
            let valueB;

            if (sortField === "year") {
                valueA =
                    Number(a.year) || 0;

                valueB =
                    Number(b.year) || 0;
            } else if (
                sortField === "genre"
            ) {
                valueA =
                    a.genre?.join(", ") || "";

                valueB =
                    b.genre?.join(", ") || "";
            } else {
                valueA =
                    a[sortField]
                        ?.toString() || "";

                valueB =
                    b[sortField]
                        ?.toString() || "";
            }

            if (
                typeof valueA === "string" &&
                typeof valueB === "string"
            ) {
                const comparison =
                    valueA.localeCompare(
                        valueB,
                        undefined,
                        {
                            sensitivity: "base"
                        }
                    );

                return sortDirection === "asc"
                    ? comparison
                    : -comparison;
            }

            return sortDirection === "asc"
                ? valueA - valueB
                : valueB - valueA;
        });
    }, [
        movies,
        sortField,
        sortDirection
    ]);

    /* ==============================
       Movie Actions
       ============================== */

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
                    (movie) =>
                        movie._id !== id
                )
            );

            if (onMovieDeleted) {
                onMovieDeleted(id);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    /* ==============================
       Loading
       ============================== */

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ErrorMessage
                message={error}
            />

            <div className="table-container">

                <table>

                    <thead>
                        <tr>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                            "title"
                                        )
                                    }
                                >
                                    Title

                                    <span>
                                        {sortField ===
                                            "title" &&
                                            (sortDirection ===
                                            "asc"
                                                ? "↑"
                                                : "↓")}
                                    </span>
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                            "director"
                                        )
                                    }
                                >
                                    Director

                                    <span>
                                        {sortField ===
                                            "director" &&
                                            (sortDirection ===
                                            "asc"
                                                ? "↑"
                                                : "↓")}
                                    </span>
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                            "year"
                                        )
                                    }
                                >
                                    Year

                                    <span>
                                        {sortField ===
                                            "year" &&
                                            (sortDirection ===
                                            "asc"
                                                ? "↑"
                                                : "↓")}
                                    </span>
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                            "genre"
                                        )
                                    }
                                >
                                    Genre

                                    <span>
                                        {sortField ===
                                            "genre" &&
                                            (sortDirection ===
                                            "asc"
                                                ? "↑"
                                                : "↓")}
                                    </span>
                                </button>
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {sortedMovies.map(
                            (movie) => (
                                <tr
                                    key={
                                        movie._id
                                    }
                                >

                                    <td>
                                        {
                                            movie.title
                                        }
                                    </td>

                                    <td>
                                        {
                                            movie.director
                                        }
                                    </td>

                                    <td>
                                        {
                                            movie.year
                                        }
                                    </td>

                                    <td>
                                        {movie.genre?.join(
                                            ", "
                                        )}
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
                            )
                        )}

                    </tbody>

                </table>

            </div>
        </>
    );
};

export default MovieTable;