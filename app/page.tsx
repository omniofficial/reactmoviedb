export default function Page() {
    return (
        <div>
            <div className="header">
                <h1>Movie Explorer</h1>
                <div className="bottom-section">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search for a movie..."
                    />
                    <select id="sort" name="sort">
                        <option value="" disabled selected>
                            Sort By
                        </option>
                        <option value="release-asc">Release Date (Asc)</option>
                        <option value="release-desc">
                            Release Date (Desc)
                        </option>
                        <option value="rating-asc">Rating (Asc)</option>
                        <option value="rating-desc">Rating (Desc)</option>
                    </select>
                </div>
            </div>

            <div id="content-container"></div>

            <div className="footer-section">
                <button id="previous-btn">Previous</button>
                <span className="page-info">Page 1 of 55687</span>
                <button id="next-btn">Next</button>
            </div>
        </div>
    );
}
