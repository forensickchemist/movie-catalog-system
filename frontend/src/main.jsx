import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/feedback.css";
import "./styles/movie-card.css";
import "./styles/movie-details.css";
import "./styles/featured.css";
import "./styles/admin.css";
import "./styles/search.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);