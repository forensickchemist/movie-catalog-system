import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getMovieById,
    updateMovie
} from "../services/movieService";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieForm from "../components/MovieForm";

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const movieData =
                    await getMovieById(id);

                setMovie(movieData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    
    const handleSubmit = async (
        form,
        poster,
        backdrop
    ) => {
        setSubmitError("");
        setSubmitting(true);

        try {
            const formData = new FormData();

            formData.append(
                "title",
                form.title
            );

            formData.append(
                "director",
                form.director
            );

            formData.append(
                "year",
                form.year
            );

            formData.append(
                "description",
                form.description
            );

            const genres = form.genre
                .split(",")
                .map((genre) => genre.trim())
                .filter(Boolean);

            genres.forEach((genre) => {
                formData.append("genre", genre);
            });

            if (poster) {
                formData.append(
                    "poster",
                    poster
                );
            }

            if (backdrop) {
                formData.append(
                    "backdrop",
                    backdrop
                );
            }

            await updateMovie(
                id,
                formData
            );

            navigate(`/movies/${id}`);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
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

    const initialValues = {
        title: movie.title || "",
        director: movie.director || "",
        year: movie.year || "",
        description: movie.description || "",
        genre: movie.genre?.join(", ") || ""
    };

    return (
        <section className="form-page">

            <div className="form-header">

                <p className="eyebrow">
                    ADMIN
                </p>

                <h1>Update Movie</h1>

            </div>

            <MovieForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={submitting}
                error={submitError}
                submitLabel="Update Movie"
                loadingLabel="Updating Movie..."
            />

        </section>
    );
};

export default EditMovie;
