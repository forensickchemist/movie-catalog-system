import { Link } from "react-router-dom";

const MovieTable = ({
    movies,
    sortField,
    sortDirection,
    handleSort,
    handleDelete
}) => {
    const getSortIndicator = (field) => {
        if (sortField !== field) {
            return "";
        }

        return sortDirection === "asc"
            ? "↑"
            : "↓";
    };

    return (
        <div className="table-container">

            <table>

                <thead>
                    <tr>

                        <th>
                            <button
                                type="button"
                                className="table-sort-button"
                                onClick={() =>
                                    handleSort("title")
                                }
                            >
                                Title

                                <span>
                                    {getSortIndicator(
                                        "title"
                                    )}
                                </span>
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="table-sort-button"
                                onClick={() =>
                                    handleSort("director")
                                }
                            >
                                Director

                                <span>
                                    {getSortIndicator(
                                        "director"
                                    )}
                                </span>
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="table-sort-button"
                                onClick={() =>
                                    handleSort("year")
                                }
                            >
                                Year

                                <span>
                                    {getSortIndicator(
                                        "year"
                                    )}
                                </span>
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="table-sort-button"
                                onClick={() =>
                                    handleSort("genre")
                                }
                            >
                                Genre

                                <span>
                                    {getSortIndicator(
                                        "genre"
                                    )}
                                </span>
                            </button>
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {movies.map((movie) => (
                        <tr key={movie._id}>

                            <td>
                                {movie.title}
                            </td>

                            <td>
                                {movie.director}
                            </td>

                            <td>
                                {movie.year}
                            </td>

                            <td>
                                {movie.genre?.join(", ")}
                            </td>

                            <td className="table-actions">

                                <Link
                                    to={`/movies/${movie._id}`}
                                >
                                    View
                                </Link>

                                <Link
                                    to={`/admin/movies/edit/${movie._id}`}
                                >
                                    Update
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            movie._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default MovieTable;
