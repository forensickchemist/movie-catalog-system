import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addMovie } from "../services/movieService";

import MovieForm from "../components/MovieForm";

const AddMovie = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: "",
        director: "",
        year: "",
        description: "",
        genre: ""
    };


    const handleSubmit = async (
        form,
        poster,
        backdrop
    ) => {
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("director", form.director);
            formData.append("year", form.year);
            formData.append(
                "description",
                form.description
            );
            formData.append("genre", form.genre);

            if (poster) {
                formData.append("poster", poster);
            }

            if (backdrop) {
                formData.append("backdrop", backdrop);
            }

            await addMovie(formData);

            navigate("/admin");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="form-page">

            <div className="form-header">

                <p className="eyebrow">
                    ADMIN
                </p>

                <h1>Add Movie</h1>

            </div>

            <MovieForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                submitLabel="Add Movie"
                loadingLabel="Adding Movie..."
            />

        </section>
    );
};

export default AddMovie;
