import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <article className="movie-card">

            <div className="movie-poster">
                {movie.poster?.url ? (
                    <img
                        src={movie.poster.url}
                        alt={`${movie.title} poster`}
                    />
                ) : (
                    <div className="poster-placeholder">
                        NO POSTER
                    </div>
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

                <Link
                    to={`/movies/${movie._id}`}
                    className="button"
                >
                    View Movie
                </Link>

            </div>

        </article>
    );
};

export default MovieCard;