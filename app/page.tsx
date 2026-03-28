"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2Q5MTE0ZDkxNjQxNDYyMWRmZDkwN2M0ZGRjOTRlZCIsIm5iZiI6MTc3MzAwNzk0Mi4zMzMsInN1YiI6IjY5YWRmNDQ2ODUzMTgyNDgzMDRlYjEyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GplMZ8ZbFpH1Svdht9y9998mPJD233SNtJ8rtyVGvBw";

const pagesToLoad = 40;
const moviesPerPage = 20;

type MovieData = {
    id: number;
    title: string;
    image: string;
    releaseDate: string;
    rating: number;
};

// Remove duplicates by movie ID
function removeDuplicateMovies(movies: MovieData[]): MovieData[] {
    const seen = new Set<number>();
    return movies.filter((movie) => {
        if (seen.has(movie.id)) return false;
        seen.add(movie.id);
        return true;
    });
}

export default function Page() {
    // ----------------------- STATES -----------------------
    const [allMovies, setAllMovies] = useState<MovieData[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setSortValue] = useState("&sort_by=popularity.desc");
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // ----------------------- EFFECTS -----------------------
    useEffect(() => {
        async function fetchMovies() {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            };

            let movies: MovieData[] = [];

            for (let page = 1; page <= pagesToLoad; page++) {
                const res = await fetch(
                    `${BASE_URL}?include_adult=false&include_video=false&page=${page}${sortValue}`,
                    options,
                );
                const data = await res.json();

                movies.push(
                    ...data.results
                        .filter((m: any) => m.poster_path)
                        .map((m: any) => ({
                            id: m.id,
                            title: m.title,
                            image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                            releaseDate: m.release_date,
                            rating: m.vote_average,
                        })),
                );
            }

            movies = removeDuplicateMovies(movies);

            setAllMovies(movies);
            setFilteredMovies(movies);
            setTotalPages(Math.ceil(movies.length / moviesPerPage));
            setCurrentPage(1);
        }

        fetchMovies();
    }, [sortValue]);

    // ----------------------- BUTTONS / EVENT HANDLERS -----------------------
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query) {
            setFilteredMovies(allMovies);
        } else {
            setFilteredMovies(
                allMovies.filter((movie) =>
                    movie.title.toLowerCase().includes(query),
                ),
            );
        }

        setCurrentPage(1);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "release-asc":
                setSortValue("&sort_by=primary_release_date.asc");
                break;
            case "release-desc":
                setSortValue("&sort_by=primary_release_date.desc");
                break;
            case "rating-asc":
                setSortValue("&sort_by=vote_average.asc");
                break;
            case "rating-desc":
                setSortValue("&sort_by=vote_average.desc");
                break;
        }
        setCurrentPage(1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // ----------------------- PAGE LOGIC -----------------------
    const startIndex = (currentPage - 1) * moviesPerPage;
    const pageMovies = filteredMovies.slice(
        startIndex,
        startIndex + moviesPerPage,
    );

    // ----------------------- RENDER PAGE -----------------------
    return (
        <div>
            <div className="header">
                <h1>Movie Explorer</h1>
                <div className="bottom-section">
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for a movie..."
                    />
                    <select id="sort" onChange={handleSort} defaultValue="">
                        <option value="" disabled>
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

            <div className="content-container">
                <div className="movies-grid">
                    {pageMovies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>

            <div className="footer-section">
                <button onClick={handlePrevious}>Previous</button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
