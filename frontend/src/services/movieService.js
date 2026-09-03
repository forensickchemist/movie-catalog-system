import request, { getAuthHeaders } from "./api";

export const getMovies = async ({
    search = "",
    page = 1,
    limit = 20,
    sort = "title",
    order = "asc"
} = {}) => {
    const params = new URLSearchParams();

    const query = search.trim();

    if (query) {
        params.set("search", query);
    }

    params.set("page", page);
    params.set("limit", limit);
    params.set("sort", sort);
    params.set("order", order);

    return request(
        `/movies/getMovies?${params.toString()}`
    );
};

export const getMovieById = async (id) => {
    return request(`/movies/getMovie/${id}`);
};

export const getMovieComments = async (id) => {
    return request(`/movies/getComments/${id}`, {
        method: "GET",
        headers: {
            ...getAuthHeaders()
        }
    });
};

export const addMovieComment = async (id, comment) => {
    return request(`/movies/addComment/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify({
            comment
        })
    });
};

export const addMovie = async (movieData) => {
    return request("/movies/addMovie", {
        method: "POST",
        headers: {
            ...getAuthHeaders()
        },
        body: movieData
    });
};

export const updateMovie = async (id, movieData) => {
    return request(`/movies/updateMovie/${id}`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders()
        },
        body: movieData
    });
};

export const deleteMovie = async (id) => {
    return request(`/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders()
        }
    });
};

export const getCurrentFeatured = async () => {
    return request("/featured/current");
};

export const setFeatured = async (
    year,
    month,
    movies
) => {
    return request(
        `/featured/${year}/${month}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders()
            },
            body: JSON.stringify({
                movies
            })
        }
    );
};