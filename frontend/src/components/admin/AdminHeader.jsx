import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <div className="admin-header">
            <div>
                <p className="eyebrow">
                    ADMIN
                </p>

                <h1>
                    Movie Dashboard
                </h1>
            </div>

            <Link
                to="/admin/movies/add"
                className="button"
            >
                Add Movie
            </Link>
        </div>
    );
};

export default AdminHeader;
