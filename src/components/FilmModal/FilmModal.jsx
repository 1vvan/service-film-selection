import React from "react";
import "./FilmModal.scss";
import { Modal } from "react-bootstrap";

const FilmModal = ({ movie, showModal, onCloseModal }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ru-RU", options);
  };
    const generateTrailerSearchLink = (movieTitle) => {
      const encodedMovieTitle = encodeURIComponent(movieTitle);
      const trailerSearchLink = `https://www.youtube.com/results?search_query=${encodedMovieTitle}+трейлер`;
      return trailerSearchLink;
    };
  const trailerSearchLink = movie
    ? generateTrailerSearchLink(movie.title)
    : null;
  return (
    <>
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Информация о фильме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movie ? (
            <div className="modal__body">
              <p>
                <span>Название:</span> {movie.title}
              </p>
              {movie.overview ? (
                <p>
                  <span>Описание</span>: {movie.overview}
                </p>
              ) : (
                ""
              )}
              <p>
                <span>Дата выхода:</span> {formatDate(movie.release_date)}
              </p>
              <a href={trailerSearchLink} target="_blank" rel="noreferrer">Смотреть трейлер на YouTube</a>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilmModal;
