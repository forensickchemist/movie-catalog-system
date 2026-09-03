import { useEffect, useMemo, useState } from "react";

import {
    getMovies,
    deleteMovie,
    getCurrentFeatured,
    setFeatured
} from "../services/movieService";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import AdminHeader from "../components/admin/AdminHeader";
import FeaturedManager from "../components/admin/FeaturedManager";
import MovieTable from "../components/admin/MovieTable";

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    const [sortField, setSortField] =
        useState("title");

    const [sortDirection, setSortDirection] =
        useState("asc");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [featuredMovies, setFeaturedMovies] =
        useState([]);

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

            setMovies(
                data.movies || []
            );
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

            setFeaturedMovies((current) =>
                current.filter(
                    (movieId) =>
                        movieId !== id
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    /* ==============================
       Featured Selection
       ============================== */

    const handleFeaturedToggle = (
        movieId
    ) => {
        setFeaturedError("");

        setFeaturedMovies((current) => {
            if (current.includes(movieId)) {
                return current.filter(
                    (id) =>
                        id !== movieId
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
            setFeaturedError(
                err.message
            );
        } finally {
            setSavingFeatured(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section>

            <AdminHeader />

            <ErrorMessage
                message={error}
            />

            <FeaturedManager
                movies={movies}
                search={search}
                setSearch={setSearch}
                featuredMovies={featuredMovies}
                featuredLoading={
                    featuredLoading
                }
                featuredError={
                    featuredError
                }
                featuredMonth={
                    featuredMonth
                }
                setFeaturedMonth={
                    setFeaturedMonth
                }
                featuredYear={
                    featuredYear
                }
                setFeaturedYear={
                    setFeaturedYear
                }
                handleFeaturedToggle={
                    handleFeaturedToggle
                }
                handleSaveFeatured={
                    handleSaveFeatured
                }
                savingFeatured={
                    savingFeatured
                }
            />

            <MovieTable
                movies={sortedMovies}
                sortField={sortField}
                sortDirection={
                    sortDirection
                }
                handleSort={handleSort}
                handleDelete={handleDelete}
            />

        </section>
    );
};

export default AdminDashboard;
