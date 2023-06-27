import React, { useEffect, useState } from "react";
import axios from "axios";
import FilmModal from "../FilmModal/FilmModal";
import likeIcon from "../../assets/likeIcon.png";
import dislikeIcon from "../../assets/dislikeIcon.png";
import { Card } from "react-bootstrap";
import "./FilmCard.scss";
import AccessModal from "../AccessModal/AccessModal";

const FilmCard = ({ selectedCategories, setUserWantToWatchFilms }) => {
  const [movie, setMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showAccessModal, setAccessShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseAccessModal = () => setAccessShowModal(false);
  const handleShowAccessModal = () => setAccessShowModal(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (selectedCategories.length > 0) {
          const categoriesQuery = selectedCategories
            .map((category) => category.value)
            .join(",");

          const totalPages = 50; // Общее количество страниц, которое вы хотите загрузить
          const randomPage = Math.floor(Math.random() * totalPages) + 1;

          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=b2f68ff7c961895ec86cd5e1eb9276b0&with_genres=${categoriesQuery}&page=${randomPage}&language=ru-RU`
          );

          const randomIndex = Math.floor(
            Math.random() * response.data.results.length
          );
          const randomMovie = response.data.results[randomIndex];

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

  const handleDislike = () => {
    const filmCard = document.querySelector(".card__wrapper");
    filmCard.classList.add("film-card__hidden");
    setTimeout(() => {
      const fetchMovie = async () => {
        try {
          if (selectedCategories.length > 0) {
            const categoriesQuery = selectedCategories
              .map((category) => category.value)
              .join(",");

            const totalPages = 50; // Общее количество страниц, которое вы хотите загрузить
            const randomPage = Math.floor(Math.random() * totalPages) + 1;

            const response = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=b2f68ff7c961895ec86cd5e1eb9276b0&with_genres=${categoriesQuery}&page=${randomPage}&language=ru-RU`
            );

            const randomIndex = Math.floor(
              Math.random() * response.data.results.length
            );
            const randomMovie = response.data.results[randomIndex];

            setMovie(randomMovie);
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      fetchMovie();
      filmCard.classList.remove("film-card__hidden");
    }, 700);
  };

  return (
    <>
      <FilmModal
        movie={movie}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
      <AccessModal
        movie={movie}
        showAccessModal={showAccessModal}
        onCloseAccessModal={handleCloseAccessModal}
        setUserWantToWatchFilms={setUserWantToWatchFilms}
      />
      {movie ? (
        <div className={`card__wrapper ${movie ? "film-card__visible" : ""}`}>
          <button className="card__button" onClick={handleDislike}>
            <img src={dislikeIcon} alt="" />
          </button>
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
          <button className="card__button" onClick={handleShowAccessModal}>
            <img src={likeIcon} alt="" />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FilmCard;
