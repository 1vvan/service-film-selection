import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./AccessModal.scss";

const AccessModal = ({
  movie,
  showAccessModal,
  onCloseAccessModal,
  setUserWantToWatchFilms,
}) => {
  const handleSaveMovie = (movie) => {
    const savedFilms = JSON.parse(localStorage.getItem("watchedFilms")) || [];

    if (!savedFilms.some((savedFilm) => savedFilm.id === movie.id)) {
      savedFilms.push(movie);
      localStorage.setItem("watchedFilms", JSON.stringify(savedFilms));
      onCloseAccessModal();
    } else {
      alert("Вы уже смотрели этот фильм! Вы можете посмотреть какие фильмы вы уже видел на главной странице.");
      setUserWantToWatchFilms(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ru-RU", options);
  };

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
        </Modal.Body>
        <Modal.Footer className="access-modal__footer">
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccessModal;