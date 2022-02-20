import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Modal, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/UserContext";
import { useLocation } from "react-router-dom";

const BuildAlbum = ({ show, handleClose, images, title }) => {
  const { currentUser } = useUserContext();
  const albumTitle = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!albumTitle.current.value.length) {
      return;
    }

    await addDoc(collection(db, "albums"), {
      name: albumTitle.current.value,
      created: serverTimestamp(),
      owner: currentUser.uid,
      images: images,
    });

    handleClose();
    setIsLoading(false);
    albumTitle.current.value = "";

    if (location.pathname.includes("album")) {
      navigate("/");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Control
            ref={albumTitle}
            type="text"
            placeholder="Name of album"
            required
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit" disabled={isLoading}>
            Create an Album
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BuildAlbum;
