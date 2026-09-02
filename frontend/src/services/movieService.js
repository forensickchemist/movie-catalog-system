import request, { getAuthHeaders } from "./api";

export const getMovies = async () => {
    return request("/movies/getMovies");
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