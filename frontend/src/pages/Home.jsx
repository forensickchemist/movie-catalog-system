import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getMovies } from "../services/movieService";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

        loadMovies();
    }, []);

    return (
        <div>

            <section className="hero">
                <p className="eyebrow">
                    THE MOVIE CATALOG
                </p>

                <h1>
                    Discover cinema.
                </h1>

                <p>
                    Explore our collection of films,
                    directors, genres, and stories.
                </p>
            </section>

            <section>
                <div className="section-heading">
                    <h2>Films</h2>
                    <span>
                        {movies.length} titles
                    </span>
                </div>

                {loading && <Loading />}

                {!loading && (
                    <ErrorMessage message={error} />
                )}

                {!loading && !error && (
                    <MovieGrid movies={movies} />
                )}
            </section>

        </div>
    );
};

export default Home;