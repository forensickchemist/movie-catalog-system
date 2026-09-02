const API_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const error = new Error(
            data?.message || "Something went wrong"
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem("access");

    return token
        ? {
              Authorization: `Bearer ${token}`
          }
        : {};
};

export default request;