import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const CreateReviewedAlbum = ({ show, handleClose, images, album }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    await addDoc(collection(db, "albums"), {
      name: `Reviewed/${album.name}`,
      created: serverTimestamp(),
      owner: album.owner,
      images: images,
    });

    handleClose();
    setIsLoading(false);
    
    if (location.pathname.includes("/review/")) {
      navigate("/review/thank-you");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit your selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Press submit to continue.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateReviewedAlbum;
