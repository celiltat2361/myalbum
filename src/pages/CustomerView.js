import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAlbum from "../hooks/useGetAlbum";
import ReviewGrid from "../components/ReviewGrid";
import CreateReviewedAlbum from "../components/CreateReviewedAlbum";

const CustomerView = () => {
  const { id } = useParams();
  const [imagesToKeep, setImagesToKeep] = useState([]);
  const [imagesToDiscard, setImagesToDiscard] = useState([]);
  const [total, setTotal] = useState();
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState();
  const album = useGetAlbum(id);

  const closeCreateAlbumModal = () => setShowModal(false);
  const showCreateAlbumModal = () => setShowModal(true);

  useEffect(() => {
    if (album) {
      let imagesTotal = album.images.length;
      setTotal(imagesTotal);
    }
  }, [album]);

  return (
    <>
      {album && (
        <div className="d-flex justify-content-between submit-review">
          <h1>Review {album.name}</h1>
          <button
            disabled={selected !== total}
            onClick={() => {
              showCreateAlbumModal();
            }}
          >
            Submit review
          </button>
        </div>
      )}

      <h3>Select Photoss</h3>
      <p>Please select photos you want to keep or discard.</p>

      {total && (
        <h5>
          {selected} / {total} selected
        </h5>
      )}

      <ReviewGrid
        album={album}
        imagesToDiscard={imagesToDiscard}
        imagesToKeep={imagesToKeep}
        setSelected={setSelected}
        selected={selected}
        setImagesToKeep={setImagesToKeep}
        setImagesToDiscard={setImagesToDiscard}
        total={total}
      />
      
      {album && (
        <div className="submit-review-mobile">
          <button
            disabled={selected !== total}
            onClick={() => {
              showCreateAlbumModal();
            }}
          >
            Submit review
          </button>
        </div>
      )}

      <CreateReviewedAlbum
        show={showModal}
        handleClose={closeCreateAlbumModal}
        handleShow={showCreateAlbumModal}
        images={imagesToKeep}
        album={album}
      />
    </>
  );
};

export default CustomerView;
