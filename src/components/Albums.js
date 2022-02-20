import React, { useState } from "react";
import useGetAlbums from "../hooks/useGetAlbums";
import BuildAlbum from "./BuildAlbum";
import Album from "./Album";
import { HashLoader } from "react-spinners";

const Albums = (album) => {
  const baseURL = window.location.href;
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [reviewLink, setReviewLink] = useState();
  const { data, isLoading } = useGetAlbums();

  const handleClose = () => setShowCreateNew(false);
  const handleShow = () => setShowCreateNew(true);

  const handleShareAlbum = () => {
    setReviewLink(`${baseURL}review/${selectedAlbum}`);
  };

  return (
    <>
      {isLoading ? (
        <div id="spinner">
          <HashLoader color={"#559900"} size={80} />
        </div>
      ) : (
        <>
          <h1>Albums</h1>
          <div className="album-actions mt-4 mb-2">
            <button onClick={handleShow}>
              Add New Album
            </button>
              
            <button
              onClick={() => handleShareAlbum()}
              disabled={!selectedAlbum?.length}
            >
              Share Album
            </button>
            
          </div>

          {reviewLink && (
            <p style={{ overflowWrap: "break-word" }}>
              Link for sharing: {reviewLink}
            </p>
          )}

          <div className="album-grid">
            <Album
              data={data}
              isLoading={isLoading}
              selectedAlbum={selectedAlbum}
              setSelectedAlbum={setSelectedAlbum}
            />
          </div>

          <BuildAlbum
            show={showCreateNew}
            handleClose={handleClose}
            handleShow={handleShow}
            images={[]}
            title={"Create album"}
          />
        </>
      )}
    </>
  );
};

export default Albums;
