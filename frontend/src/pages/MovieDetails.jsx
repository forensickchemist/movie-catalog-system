import { useEffect, useState } from "react";
import {
    Link,
    useParams
} from "react-router-dom";

import {
    getMovieById,
    getMovieComments,
    addMovieComment
} from "../services/movieService";

import { useAuth } from "../context/AuthContext";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PosterPlaceholder from "../components/PosterPlaceholder";

const MovieDetails = () => {
    const { id } = useParams();

    const { isAuthenticated } = useAuth();

    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [commentError, setCommentError] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const movieData =
                    await getMovieById(id);

                setMovie(movieData);

                if (isAuthenticated) {
                    const commentsData =
                        await getMovieComments(id);

                    setComments(commentsData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id, isAuthenticated]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (!comment.trim()) {
            return;
        }

        setCommentError("");
        setCommentLoading(true);

        try {
            await addMovieComment(
                id,
                comment
            );

            const updatedComments =
                await getMovieComments(id);

            setComments(updatedComments);
            setComment("");
        } catch (err) {
            setCommentError(err.message);
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error || !movie) {
        return (
            <ErrorMessage
                message={error || "Movie not found"}
            />
        );
    }

    const hasBackdrop = Boolean(
        movie.backdrop?.url
    );

    return (
        <article className="movie-details">

            {/* ==============================
                Cinematic Header
            ============================== */}

            <section
                className={`details-hero ${
                    hasBackdrop ? "has-backdrop" : ""
                }`}
            >
                {hasBackdrop && (
                    <div
                        className="details-backdrop"
                        style={{
                            backgroundImage: `url("${movie.backdrop.url}")`
                        }}
                    />
                )}

                <div className="details-backdrop-overlay" />

                <div className="app-container">
                    <div className="details-intro">
                        <p className="eyebrow">
                            {movie.year}
                        </p>

                        <h1>
                            {movie.title}
                        </h1>

                        <p className="details-director">
                            Directed by{" "}
                            <strong>
                                {movie.director}
                            </strong>
                        </p>

                        <div className="genre-list">
                            {movie.genre?.map((genre) => (
                                <span key={genre}>
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ==============================
                Film Information
               ============================== */}

            <section className="details-film">

                <div className="details-poster">
                    {movie.poster?.url ? (
                        <img
                            src={movie.poster.url}
                            alt={`${movie.title} poster`}
                        />
                    ) : (
                        <PosterPlaceholder />
                    )}
                </div>

                <div className="details-description">

                    <div className="details-label">
                        ABOUT THE FILM
                    </div>

                    <p className="movie-description">
                        {movie.description}
                    </p>

                </div>

            </section>

            {/* ==============================
                Comments
               ============================== */}

            <section className="comments">

                <div className="comments-heading">
                    <div>
                        <p className="eyebrow">
                            AUDIENCE
                        </p>

                        <h2>
                            Comments
                        </h2>
                    </div>

                    {comments.length > 0 && (
                        <span className="comments-count">
                            {comments.length}{" "}
                            {comments.length === 1
                                ? "comment"
                                : "comments"}
                        </span>
                    )}
                </div>

                {isAuthenticated ? (
                    <form
                        onSubmit={handleCommentSubmit}
                        className="comment-form"
                    >
                        <textarea
                            value={comment}
                            onChange={(event) =>
                                setComment(
                                    event.target.value
                                )
                            }
                            placeholder="Share your thoughts..."
                            rows="4"
                        />

                        <ErrorMessage
                            message={commentError}
                        />

                        <div className="comment-form-actions">
                            <button
                                type="submit"
                                className="button"
                                disabled={commentLoading}
                            >
                                {commentLoading
                                    ? "Posting..."
                                    : "Post Comment"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="comment-login">
                        <Link to="/login">
                            Sign in
                        </Link>{" "}
                        to leave a comment.
                    </p>
                )}

                <div className="comment-list">

                    {!comments.length ? (
                        <p className="no-comments">
                            No comments yet.
                        </p>
                    ) : (
                        comments.map((item) => (
                            <div
                                className="comment"
                                key={item.id}
                            >
                                <div className="comment-header">
                                    <strong>
                                        {item.displayName}
                                    </strong>

                                    {item.createdAt && (
                                        <time
                                            dateTime={
                                                item.createdAt
                                            }
                                        >
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString(
                                                [],
                                                {
                                                    dateStyle:
                                                        "medium",
                                                    timeStyle:
                                                        "short"
                                                }
                                            )}
                                        </time>
                                    )}
                                </div>

                                <p>
                                    {item.comment}
                                </p>
                            </div>
                        ))
                    )}

                </div>

            </section>

        </article>
    );
};

export default MovieDetails;
