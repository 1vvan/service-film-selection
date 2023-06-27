import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./AccessModal.scss";

const AccessModal = ({ movie, showAccessModal, onCloseAccessModal }) => {
  const [showWatchedFilms, setShowWatchedFilms] = useState(false);
  const [watchedFilms, setWatchedFilms] = useState(false);

  const handleSaveMovie = (movie) => {
    const savedFilms = JSON.parse(localStorage.getItem("watchedFilms")) || [];

    if (!savedFilms.some((savedFilm) => savedFilm.id === movie.id)) {
      savedFilms.push(movie);
      localStorage.setItem("watchedFilms", JSON.stringify(savedFilms));
      onCloseAccessModal();
      setShowWatchedFilms(false);
    } else {
      alert("Вы уже смотрели этот фильм!");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ru-RU", options);
  };

  const handleButtonClick = () => {
    setShowWatchedFilms(true)
    setWatchedFilms(JSON.parse(localStorage.getItem("watchedFilms")));
  }

  return (
    <>
      <Modal show={showAccessModal} onHide={onCloseAccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Будете смотреть фильм?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movie ? (
            <div className="modal__body">
              <p>
                <span>Название:</span> {movie.title}
              </p>
              <p>
                <span>Дата выхода:</span> {formatDate(movie.release_date)}
              </p>
            </div>
          ) : (
            ""
          )}
          {showWatchedFilms === true ? (
            <strong >
              <p>Просмотренные фильмы:</p>
            </strong>
          ) : (
            ""
          )}
          {showWatchedFilms === true
            ? watchedFilms.map((film) => <p key={film.id}>{film.title}</p>)
            : ""}
        </Modal.Body>
        <Modal.Footer className="access-modal__footer">
          <div className="access-buttons">
            <Button
              className="access-modal__button"
              variant="danger"
              onClick={onCloseAccessModal}
            >
              Отмена
            </Button>
            <Button
              className="access-modal__button"
              variant="success"
              onClick={() => handleSaveMovie(movie)}
            >
              Да, буду!
            </Button>
          </div>
          <Button
            className="access-modal__button"
            variant="success"
            onClick={handleButtonClick}
          >
            Просмотренные фильмы
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccessModal;
