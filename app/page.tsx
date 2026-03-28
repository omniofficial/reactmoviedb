"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2Q5MTE0ZDkxNjQxNDYyMWRmZDkwN2M0ZGRjOTRlZCIsIm5iZiI6MTc3MzAwNzk0Mi4zMzMsInN1YiI6IjY5YWRmNDQ2ODUzMTgyNDgzMDRlYjEyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GplMZ8ZbFpH1Svdht9y9998mPJD233SNtJ8rtyVGvBw";

const pagesToLoad = 40;
const moviesPerPage = 20;

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
