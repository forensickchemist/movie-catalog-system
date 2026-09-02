import { useState } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

const MovieForm = ({
    initialValues,
    onSubmit,
    loading,
    error,
    submitLabel,
    loadingLabel
}) => {
    const [form, setForm] = useState(initialValues);
    const [poster, setPoster] = useState(null);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handlePosterChange = (event) => {
        setPoster(
            event.target.files[0] || null
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onSubmit(form, poster);
    };

    return (
        <div className="form-card">

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit}>

                <label>
                    Title

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Director

                    <input
                        type="text"
                        name="director"
                        value={form.director}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Year

                    <input
                        type="number"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        min="1888"
                        max={new Date().getFullYear()}
                        required
                    />
                </label>

                <label>
                    Genre

                    <input
                        type="text"
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        placeholder="Drama"
                        required
                    />
                </label>

                <label>
                    Description

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="6"
                        required
                    />
                </label>

                <label>
                    Poster

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePosterChange}
                    />

                    <small>
                        JPG, PNG, or WEBP. Maximum 5 MB.
                    </small>
                </label>

                <div className="form-actions">

                    <Link
                        to="/admin"
                        className="button button-outline"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="button"
                        disabled={loading}
                    >
                        {loading
                            ? loadingLabel
                            : submitLabel}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default MovieForm;
