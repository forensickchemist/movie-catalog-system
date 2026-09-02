import request, { getAuthHeaders } from "./api";

export const registerUser = async (email, password) => {
    return request("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
};

export const loginUser = async (email, password) => {
    return request("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
};

export const getCurrentUser = async () => {
    return request("/users/me", {
        method: "GET",
        headers: {
            ...getAuthHeaders()
        }
    });
};