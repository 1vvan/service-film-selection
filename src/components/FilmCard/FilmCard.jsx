import React, { useEffect, useState } from "react";
import "./FilmCard.scss";
import axios from "axios";
import FilmModal from "../FilmModal/FilmModal";
import { Card } from "react-bootstrap";

const FilmCard = ({ selectedCategories }) => {
  const [movie, setMovie] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Формируем строку запроса для выбранных категорий
        if (selectedCategories.length > 0) {
          const categoriesQuery = selectedCategories
            .map((category) => category.value)
            .join(",");

          // Выполняем запрос к TMDb API
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=b2f68ff7c961895ec86cd5e1eb9276b0&with_genres=${categoriesQuery}&page=1&language=ru-RU`
          );

          const randomIndex = Math.floor(
            Math.random() * response.data.results.length
          );
          const randomMovie = response.data.results[randomIndex];

          // Обновляем состояние с полученными фильмами
          setMovie(randomMovie);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedCategories]);

  if (movie) {
    console.log(movie);
  }

  return (
    <>
      <FilmModal
        movie={movie}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
      {movie ? (
        <Card
          className={`film-card ${movie ? "film-card__visible" : ""}`}
          onClick={handleShowModal}
        >
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
          <Card.Body>
            <Card.Text>{movie.title}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default FilmCard;
