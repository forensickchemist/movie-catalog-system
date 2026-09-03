import { useState } from "react";

const SearchBar = ({
    value,
    onChange,
    placeholder = "Search..."
}) => {
    const [inputValue, setInputValue] = useState(value || "");

    const handleChange = (event) => {
        const newValue = event.target.value;

        setInputValue(newValue);
        onChange(newValue);
    };

    const handleClear = () => {
        setInputValue("");
        onChange("");
    };

    return (
        <div className="search-bar">

            <div className="search-input-wrapper">

                <span
                    className="search-icon"
                    aria-hidden="true"
                >
                    ⌕
                </span>

                <input
                    type="search"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label={placeholder}
                />

                {inputValue && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}

            </div>

        </div>
    );
};

export default SearchBar;