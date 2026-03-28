import styles from "./MovieCard.module.css";

type MovieData = {
    title: string;
    image: string;
    releaseDate: string;
    rating: number;
};

export default function MovieCard({
    title,
    image,
    releaseDate,
    rating,
}: MovieData) {
    return (
        <div className="movie-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>Release Date: {releaseDate}</p>
            <p>Rating: {rating}</p>
        </div>
    );
}
