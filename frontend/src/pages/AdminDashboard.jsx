import { useEffect, useState } from "react";

import {
    getCurrentFeatured,
    setFeatured
} from "../services/movieService";

import Loading from "../components/Loading";

import AdminHeader from "../components/admin/AdminHeader";
import FeaturedManager from "../components/admin/FeaturedManager";
import MovieTable from "../components/admin/MovieTable";

const AdminDashboard = () => {
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
        loadFeatured();
    }, []);

    /* ==============================
       Movie Actions
       ============================== */

    const handleMovieDeleted = (id) => {
        setFeaturedMovies((current) =>
            current.filter(
                (movieId) =>
                    movieId !== id
            )
        );
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

    return (
        <section>

            <AdminHeader />

            <FeaturedManager
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
                onMovieDeleted={
                    handleMovieDeleted
                }
            />

        </section>
    );
};

export default AdminDashboard;