import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
    if (!movies.length) {
        return (
            <p className="empty-state">
                No movies available.
            </p>
        );
    }

    return (
        <section className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                />
            ))}
        </section>
    );
};

export default MovieGrid;