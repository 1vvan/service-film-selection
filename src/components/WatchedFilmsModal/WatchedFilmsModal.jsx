import React from "react";
import { Modal } from "react-bootstrap";

const WatchedFilmsModal = ({ showModal, onCloseModal }) => {
  let savedFilms = [{ id: 1, title: "Нет фильмов" }];
  JSON.parse(localStorage.getItem("watchedFilms"));
  if (JSON.parse(localStorage.getItem("watchedFilms"))) {
    savedFilms = JSON.parse(localStorage.getItem("watchedFilms"));
  }

  return (
    <>
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Фильмы которые вы уже видели</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savedFilms.map((film) => (
            <strong>
                <p key={film.id}>{film.title}</p>
            </strong>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WatchedFilmsModal;
