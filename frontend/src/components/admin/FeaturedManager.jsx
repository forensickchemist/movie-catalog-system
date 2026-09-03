import SearchBar from "../SearchBar";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import PosterPlaceholder from "../PosterPlaceholder";

const FeaturedManager = ({
    movies,
    search,
    setSearch,
    featuredMovies,
    featuredLoading,
    featuredError,
    featuredMonth,
    setFeaturedMonth,
    featuredYear,
    setFeaturedYear,
    handleFeaturedToggle,
    handleSaveFeatured,
    savingFeatured
}) => {
    const selectedMovies = featuredMovies
        .map((movieId) =>
            movies.find(
                (movie) => movie._id === movieId
            )
        )
        .filter(Boolean);

    const filteredMovies = (() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return [];
        }

        return movies.filter((movie) => {
            const title =
                movie.title?.toLowerCase() || "";

            const director =
                movie.director?.toLowerCase() || "";

            const year =
                movie.year?.toString() || "";

            const genres =
                movie.genre
                    ?.join(" ")
                    .toLowerCase() || "";

            return (
                title.includes(query) ||
                director.includes(query) ||
                year.includes(query) ||
                genres.includes(query)
            );
        });
    })();

    return (
        <section className="featured-admin">

            <div className="section-heading">
                <div>
                    <p className="eyebrow">
                        FEATURED FILMS
                    </p>

                    <h2>
                        Monthly Selection
                    </h2>
                </div>

                <p>
                    Select three films to feature
                    this month.
                </p>
            </div>

            <div className="featured-admin-controls">

                <label>
                    Month

                    <select
                        value={featuredMonth}
                        onChange={(event) =>
                            setFeaturedMonth(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    >
                        <option value={1}>
                            January
                        </option>

                        <option value={2}>
                            February
                        </option>

                        <option value={3}>
                            March
                        </option>

                        <option value={4}>
                            April
                        </option>

                        <option value={5}>
                            May
                        </option>

                        <option value={6}>
                            June
                        </option>

                        <option value={7}>
                            July
                        </option>

                        <option value={8}>
                            August
                        </option>

                        <option value={9}>
                            September
                        </option>

                        <option value={10}>
                            October
                        </option>

                        <option value={11}>
                            November
                        </option>

                        <option value={12}>
                            December
                        </option>
                    </select>
                </label>

                <label>
                    Year

                    <input
                        type="number"
                        value={featuredYear}
                        onChange={(event) =>
                            setFeaturedYear(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />
                </label>

                <span className="featured-count">
                    {featuredMovies.length} / 3 selected
                </span>

            </div>

            <ErrorMessage
                message={featuredError}
            />

            {/* ==============================
                Add Featured Film
               ============================== */}

            <div className="featured-search">

                <div className="featured-subheading">
                    <div>
                        <p className="eyebrow">
                            ADD FEATURED FILM
                        </p>

                        <h3>
                            Search the catalog
                        </h3>
                    </div>
                </div>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search films, directors, genres..."
                />

                {search.trim() && (
                    <div className="featured-search-results">

                        <div className="featured-results-heading">
                            <span>
                                Search results: {filteredMovies.length}
                            </span>
                        </div>

                        {filteredMovies.length > 0 ? (
                            <div className="featured-results-list">

                                {filteredMovies.map(
                                    (movie) => {
                                        const isSelected =
                                            featuredMovies.includes(
                                                movie._id
                                            );

                                        const isFull =
                                            featuredMovies.length >= 3;

                                        return (
                                            <div
                                                key={movie._id}
                                                className="featured-search-result"
                                            >
                                                <div className="featured-search-result-info">

                                                    <div>
                                                        <strong>
                                                            {movie.title}
                                                        </strong>

                                                        <span>
                                                            {movie.director}
                                                        </span>
                                                    </div>

                                                    <span className="featured-search-result-year">
                                                        {movie.year}
                                                    </span>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="featured-result-action"
                                                    onClick={() =>
                                                        handleFeaturedToggle(
                                                            movie._id
                                                        )
                                                    }
                                                    disabled={
                                                        !isSelected &&
                                                        isFull
                                                    }
                                                >
                                                    {isSelected
                                                        ? "Already added"
                                                        : "Add"}
                                                </button>

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        ) : (
                            <div className="featured-empty">
                                <p>
                                    No films found matching
                                    your search.
                                </p>
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* ==============================
                Current Selection
               ============================== */}

            <div className="featured-selection">

                <div className="featured-subheading">
                    <div>
                        <p className="eyebrow">
                            CURRENT SELECTION
                        </p>

                        <h3>
                            {featuredMovies.length} / 3
                        </h3>
                    </div>
                </div>

                {featuredLoading ? (
                    <Loading />
                ) : selectedMovies.length > 0 ? (
                    <div className="featured-selected-list">

                        {selectedMovies.map(
                            (movie, index) => (
                                <div
                                    key={movie._id}
                                    className="featured-selected-item"
                                >
                                    <div className="featured-selected-poster">

                                        {movie.poster?.url ? (
                                            <img
                                                src={
                                                    movie.poster.url
                                                }
                                                alt={`${movie.title} poster`}
                                            />
                                        ) : (
                                            <PosterPlaceholder />
                                        )}

                                    </div>

                                    <div className="featured-selected-info">

                                        <span className="featured-selected-number">
                                            0{index + 1}
                                        </span>

                                        <div>
                                            <strong>
                                                {movie.title}
                                            </strong>

                                            <span>
                                                {movie.year}
                                            </span>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="featured-remove-button"
                                        onClick={() =>
                                            handleFeaturedToggle(
                                                movie._id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <div className="featured-empty">
                        <p>
                            No films have been selected
                            for this month.
                        </p>
                    </div>
                )}

            </div>

            {/* ==============================
                Save
               ============================== */}

            <div className="featured-admin-actions">

                <button
                    type="button"
                    className="button"
                    onClick={handleSaveFeatured}
                    disabled={
                        savingFeatured ||
                        featuredMovies.length !== 3
                    }
                >
                    {savingFeatured
                        ? "Saving..."
                        : "Save Featured Films"}
                </button>

            </div>

        </section>
    );
};

export default FeaturedManager;
