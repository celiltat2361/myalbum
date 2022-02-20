import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../firebase";
import { collection, setDoc, serverTimestamp } from "firebase/firestore";

const RenameAlbum = ({ show, handleClose, images, album }) => {
  const [isLoading, setIsLoading] = useState(false);

  const albumTitle = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!albumTitle.current.value.length) {
      return;
    }

    await setDoc(collection(db, "albums", album.id), {
      name: albumTitle.current.value,
      created: serverTimestamp(),
      owner: album.owner,
      images: images,
    });

    handleClose();
    setIsLoading(false);
    albumTitle.current.value = "";
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename album</Modal.Title>
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
            Rename
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RenameAlbum;
