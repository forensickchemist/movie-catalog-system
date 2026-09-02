import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import PosterPlaceholder from "./PosterPlaceholder";

const MovieCard = ({ movie }) => {
    const { isAdmin } = useAuth();

    return (
        <article className="movie-card">

            <div className="movie-poster">
                {movie.poster?.url ? (
                    <img
                        src={movie.poster.url}
                        alt={`${movie.title} poster`}
                    />
                ) : (
                    <PosterPlaceholder />
                )}
            </div>

            <div className="movie-card-content">

                <p className="movie-year">
                    {movie.year}
                </p>

                <h2>
                    {movie.title}
                </h2>

                <p className="movie-director">
                    Directed by {movie.director}
                </p>

                <div className="genre-list">
                    {movie.genre?.map((genre) => (
                        <span key={genre}>
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="movie-card-actions">

                    <Link
                        to={`/movies/${movie._id}`}
                        className="button"
                    >
                        View Movie
                    </Link>

                    {isAdmin && (
                        <Link
                            to={`/admin/movies/edit/${movie._id}`}
                            className="button"
                        >
                            Update
                        </Link>
                    )}

                </div>

            </div>

        </article>
    );
};

export default MovieCard;
