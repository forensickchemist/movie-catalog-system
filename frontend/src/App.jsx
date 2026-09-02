import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>

                <Navbar />

                <main className="app-container">
                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />

                        <Route
                            path="/movies/:id"
                            element={<MovieDetails />}
                        />

                        <Route element={<ProtectedRoute adminOnly />}>
                            <Route
                                path="/admin"
                                element={<AdminDashboard />}
                            />

                            <Route
                                path="/admin/movies/add"
                                element={<AddMovie />}
                            />

                            <Route
                                path="/admin/movies/edit/:id"
                                element={<EditMovie />}
                            />
                        </Route>

                    </Routes>
                </main>

            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;