import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getMovies,
    deleteMovie
} from "../../services/movieService";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SearchBar from "../SearchBar";

const MovieTable = ({
    onMovieDeleted
}) => {
    const [movies, setMovies] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] =
        useState(null);

    const [sortField, setSortField] =
        useState("title");

    const [sortDirection, setSortDirection] =
        useState("asc");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [reloadKey, setReloadKey] =
        useState(0);

    /* ==============================
       Load Movies
       ============================== */

    useEffect(() => {
        let cancelled = false;

        const loadMovies = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getMovies({
                    search,
                    page,
                    limit: 10,
                    sort: sortField,
                    order: sortDirection
                });

                if (cancelled) {
                    return;
                }

                setMovies(data.movies || []);

                setPagination(
                    data.pagination || null
                );
            } catch (err) {
                if (cancelled) {
                    return;
                }

                setError(err.message);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        const timeout = setTimeout(
            loadMovies,
            search.trim() ? 300 : 0
        );

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [
        search,
        page,
        sortField,
        sortDirection,
        reloadKey
    ]);

    /* ==============================
       Search
       ============================== */

    const handleSearch = (value) => {
        setSearch(value);

        // Always return to the first page
        // when the search changes.
        setPage(1);
    };

    /* ==============================
       Sorting
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
        setPage(1);
    };

    const getSortIndicator = (field) => {
        if (sortField !== field) {
            return "";
        }

        return sortDirection === "asc"
            ? "↑"
            : "↓";
    };

    /* ==============================
       Delete
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

            if (onMovieDeleted) {
                onMovieDeleted(id);
            }

            /*
             * If this was the only movie on the
             * current page, move back one page.
             */
            if (
                movies.length === 1 &&
                page > 1
            ) {
                setPage(
                    (current) => current - 1
                );
            } else {
                setReloadKey(
                    (current) => current + 1
                );
            }
        } catch (err) {
            setError(err.message);
        }
    };

    /* ==============================
       Loading
       ============================== */

    if (loading) {
        return (
            <>
                <div className="section-heading">
                    <h2>Films</h2>
                </div>

                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search films, directors, genres..."
                />

                <Loading />
            </>
        );
    }

    return (
        <>
            <div className="section-heading">
                <h2>Films</h2>

                {pagination && (
                    <span>
                        {
                            pagination.totalMovies
                        }{" "}
                        {pagination.totalMovies === 1
                            ? "title"
                            : "titles"}
                    </span>
                )}
            </div>

            <SearchBar
                value={search}
                onChange={handleSearch}
                placeholder="Search films, directors, genres..."
            />

            <ErrorMessage
                message={error}
            />

            {movies.length === 0 ? (
                <p className="empty-state">
                    {search.trim()
                        ? `No films found for "${search}".`
                        : "No films found."}
                </p>
            ) : (
                <div className="table-container">

                    <table>

                        <thead>
                            <tr>

                                {[
                                    "title",
                                    "director",
                                    "year",
                                    "genre"
                                ].map((field) => (
                                    <th key={field}>
                                        <button
                                            type="button"
                                            className="table-sort-button"
                                            onClick={() =>
                                                handleSort(
                                                    field
                                                )
                                            }
                                        >
                                            {field
                                                .charAt(0)
                                                .toUpperCase() +
                                                field.slice(1)}

                                            <span>
                                                {
                                                    getSortIndicator(
                                                        field
                                                    )
                                                }
                                            </span>
                                        </button>
                                    </th>
                                ))}

                                <th>
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {movies.map(
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
                                                state={{ from: "admin-movies" }}
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
            )}

            {/* ==============================
                Pagination
               ============================== */}

            {pagination &&
                pagination.totalPages > 1 && (
                    <div className="table-pagination">

                        <button
                            type="button"
                            className="button"
                            onClick={() =>
                                setPage(
                                    (current) =>
                                        current - 1
                                )
                            }
                            disabled={
                                page === 1
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page{" "}
                            {
                                pagination.currentPage
                            }{" "}
                            of{" "}
                            {
                                pagination.totalPages
                            }
                        </span>

                        <button
                            type="button"
                            className="button"
                            onClick={() =>
                                setPage(
                                    (current) =>
                                        current + 1
                                )
                            }
                            disabled={
                                page ===
                                pagination.totalPages
                            }
                        >
                            Next
                        </button>

                    </div>
                )}

        </>
    );
};

export default MovieTable;