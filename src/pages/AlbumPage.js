import React, { useState, useRef } from "react";
import { firebaseTimestampToString } from "../helpers/convertTimeStamp";
import { useParams } from "react-router-dom";
import BuildAlbum from "../components/BuildAlbum";
import PhotoDropZone from "../components/PhotoDropZone";
import PhotoItem from "../components/PhotoItem";
import useGetAlbum from "../hooks/useGetAlbum";
import useEditAlbum from "../hooks/useEditAlbum";
import useDeletePhotos from "../hooks/useDeletePhotos";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import { SRLWrapper } from "simple-react-lightbox";
import { Form } from "react-bootstrap";
import "../css/dropzone.scss";

const AlbumPage = () => {
  const { id } = useParams();
  const newAlbumTitle = useRef();
  const [showDropZone, setShowDropZone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [reviewLink, setReviewLink] = useState();
  const { mutate, isMutating } = useDeleteAlbum(id);
  const deletePhotos = useDeletePhotos(selectedImages);
  const albumTitle = useEditAlbum(id);
  const album = useGetAlbum(id);

  const closeCreateAlbumModal = () => setShowModal(false);
  const showCreateAlbumModal = () => setShowModal(true);
  const toggleDropZone = () => setShowDropZone(!showDropZone);

  const handleSelectedImages = (image, e) => {
    if (e.target.checked) {
      if (selectedImages.includes(image)) {
        return;
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      setSelectedImages(selectedImages.filter((i) => i !== image));
    }
  };

  const handleDeleteImages = () => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete the pictures you selected?"
    );
    if (confirm === true) {
      deletePhotos.mutate(selectedImages, album);
      setSelectedImages([]);
    }
  };

  const handleDeleteAlbum = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (confirm === true) {
      mutate(album);
    }
  };

  const renameAlbum = (e) => {
    e.preventDefault();

    if (!newAlbumTitle.current.value.length) {
      return;
    }

    albumTitle.mutate(newAlbumTitle.current.value);

    newAlbumTitle.current.value = "";
    setShowEditTitle(false);
  };

  const handleShareAlbum = () => {
    let baseURL = window.location.protocol + "//" + window.location.host + "/";
    setReviewLink(`${baseURL}review/${id}`);
  };

  return (
    <>
      {album && (
        <>
          <div className="album-header">
            <h1>{album.name}</h1>
            <div className="album-actions">
              <button onClick={() => setShowEditTitle(!showEditTitle)}>
                Edit
              </button>
              <button onClick={() => handleDeleteAlbum()}>
                Delete
              </button>
              <button onClick={() => handleShareAlbum()}>
                Share
              </button>
            </div>
          </div>

          {showEditTitle && (
            <div className="new-album-title">
              <Form onSubmit={(e) => renameAlbum(e)}>
                <input
                  ref={newAlbumTitle}
                  placeholder="New album title"
                ></input>
                <button type="submit">
                  Save
                </button>
              </Form>
            </div>
          )}

          <p>{firebaseTimestampToString(album.created)}</p>

          {reviewLink && (
            <p style={{ overflowWrap: "break-word" }}>
              Share this album: <a href={reviewLink}>{reviewLink}</a>
            </p>
          )}
        </>
      )}

      <div className="image-and-actions-wrapper">
        <div className="album-actions">
          <h3>For Photos</h3>
          <button onClick={() => toggleDropZone()}>
            Upload
          </button>
          <button
            onClick={() => showCreateAlbumModal()}
            disabled={!selectedImages.length}
          >
           Select For Album
          </button>
          <button
            onClick={() => handleDeleteImages()}
            disabled={!selectedImages.length}
          >
            Delete
          </button>
        </div>

        {showDropZone && (
          <div className="d-flex flex-column">
            <div className="align-self-end close-dropzone-button">
              <button onClick={() => setShowDropZone(false)}>Close</button>
            </div>
            <PhotoDropZone albumId={id} />
          </div>
        )}

        {!isMutating && (
          <div className="mt-5">
            {album?.images.length < 1 ? (
              <p>No images.</p>
            ) : (
              <SRLWrapper>
                <div className="album-image">
                  {album?.images &&
                    album?.images.map((image, i) => {
                      return (
                        <PhotoItem
                          key={i}
                          image={image}
                          handleSelectedImages={handleSelectedImages}
                        />
                      );
                    })}
                </div>
              </SRLWrapper>
            )}
          </div>
        )}
      </div>

      <BuildAlbum
        show={showModal}
        handleClose={closeCreateAlbumModal}
        handleShow={showCreateAlbumModal}
        images={selectedImages}
        title="Create new album from selected"
      />
    </>
  );
};

export default AlbumPage;
