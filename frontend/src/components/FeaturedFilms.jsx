import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCurrentFeatured } from "../services/movieService";
import Loading from "./Loading";

const FeaturedFilms = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("next");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const data = await getCurrentFeatured();
                setMovies(data.movies || []);
            } catch (err) {
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        loadFeatured();
    }, []);

    const goToPrevious = () => {
        setDirection("previous");

        setCurrentIndex((current) =>
            current === 0
                ? movies.length - 1
                : current - 1
        );
    };

    const goToNext = () => {
        setDirection("next");

        setCurrentIndex((current) =>
            current === movies.length - 1
                ? 0
                : current + 1
        );
    };

    const goToSlide = (index) => {
        setDirection(
            index > currentIndex
                ? "next"
                : "previous"
        );

        setCurrentIndex(index);
    };

    if (loading) {
        return (
            <section className="featured-films">
                <Loading />
            </section>
        );
    }

    if (movies.length === 0) {
        return null;
    }

    const movie = movies[currentIndex];

    return (
        <section className="featured-films">
            <div className="featured-header">
                <div>
                    <p className="eyebrow">
                        FEATURED FILMS
                    </p>

                    <h2>
                        This Month's Selection
                    </h2>
                </div>

                <span className="featured-counter">
                    {currentIndex + 1} / {movies.length}
                </span>
            </div>

            <div className="featured-hero">
                <div
                    key={movie._id}
                    className={`featured-slide ${direction}`}
                >
                    <div
                        className="featured-backdrop"
                        style={{
                            backgroundImage:
                                movie.backdrop?.url
                                    ? `url("${movie.backdrop.url}")`
                                    : "none"
                        }}
                    />

                    <div className="featured-overlay" />

                    <div className="featured-content">
                        <p className="featured-label">
                            FEATURED FILM
                        </p>

                        <h3>{movie.title}</h3>

                        <div className="featured-meta">
                            <span>
                                {movie.director}
                            </span>

                            <span>
                                {movie.year}
                            </span>
                        </div>

                        <p className="featured-description">
                            {movie.description}
                        </p>

                        <Link
                            to={`/movies/${movie._id}`}
                            className="button featured-button"
                        >
                            View Film
                        </Link>
                    </div>
                </div>

                <div className="featured-controls">
                    <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous featured film"
                    >
                        ←
                    </button>

                    <div className="featured-dots">
                        {movies.map((item, index) => (
                            <button
                                key={item._id}
                                type="button"
                                className={
                                    index === currentIndex
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    goToSlide(index)
                                }
                                aria-label={`View featured film ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next featured film"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedFilms;
