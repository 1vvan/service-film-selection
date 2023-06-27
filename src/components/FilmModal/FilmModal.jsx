import React from "react";
import "./FilmModal.scss";
import { Modal } from "react-bootstrap";

const FilmModal = ({ movie, showModal, onCloseModal }) => {

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("ru-RU", options);
    };
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
              <p>
                <span>Описание</span>: {movie.overview}
              </p>
              <p>
                <span>Дата выхода:</span> {formatDate(movie.release_date)}
              </p>
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
