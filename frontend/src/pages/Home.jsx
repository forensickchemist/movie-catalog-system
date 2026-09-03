import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import FeaturedFilms from "../components/FeaturedFilms";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getMovies } from "../services/movieService";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getMovies({search});

                setMovies(data.movies || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(
            loadMovies,
            search.trim() ? 300 : 0
        );

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div>
            <section className="hero">
                <div className="app-container">
                    <p className="eyebrow hero-eyebrow">
                        THE MOVIE CATALOG
                    </p>

                    <h1 className="hero-title">
                        Discover cinema
                    </h1>

                    <div className="hero-line" />

                    <p className="hero-description">
                        Explore our collection of films,
                        directors, genres, and stories.
                    </p>
                </div>
            </section>

            <FeaturedFilms />

            <section className="app-container">
                <div className="section-heading">
                    <h2>Films</h2>

                    <span>
                        {movies.length}{" "}
                        {movies.length === 1
                            ? "title"
                            : "titles"}
                    </span>
                </div>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search films, directors, genres..."
                />

                {loading && <Loading />}

                {!loading && (
                    <ErrorMessage message={error} />
                )}

                {!loading && !error && (
                    <MovieGrid
                        movies={movies}
                    />
                )}

                {!loading &&
                    !error &&
                    search.trim() &&
                    movies.length === 0 && (
                        <p className="empty-state">
                            No films found for "{search}".
                        </p>
                    )}
            </section>
        </div>
    );
};

export default Home;