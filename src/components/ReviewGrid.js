import React from "react";
import styles from "../css/Album.module.css";
import SelectedList from "./SelectedList";
import { SRLWrapper } from "simple-react-lightbox";

const ReviewGrid = ({
  album,
  selected,
  setSelected,
  setImagesToKeep,
  setImagesToDiscard,
  imagesToDiscard,
  imagesToKeep,
  total,
}) => {
  const selectImages = (image, e) => {
    if (e.target.value === "keep") {
      if (imagesToDiscard.includes(image)) {
        let newState = imagesToDiscard.filter((i) => i !== image);
        setImagesToDiscard(newState);
        setImagesToKeep([...imagesToKeep, image]);
      } else {
        setImagesToKeep([...imagesToKeep, image]);
        setSelected(selected + 1);
      }
    }

    if (e.target.value === "discard") {
      if (imagesToKeep.includes(image)) {
        let newState = imagesToKeep.filter((i) => i !== image);
        setImagesToKeep(newState);
        setImagesToDiscard([...imagesToDiscard, image]);
      } else {
        setImagesToDiscard([...imagesToDiscard, image]);
        setSelected(selected + 1);
      }
    }
  };

  
  return (
    <>
      <div className="album-review-container">
        <div className="col">
          <SRLWrapper>
            <div className="reviewed-album-image-grid">
              {album?.images &&
                album.images.map((image, i) => {
                  return (
                    <div key={i} className={styles.imageContainer}>
                      
                      <div className={styles.reviewCheckbox}>
                      
                        <select
                          defaultValue="choose"
                          onChange={(e) => selectImages(image, e)}
                        >
                          <option disabled value="choose">-</option>
                          <option value="keep">Keep</option>
                          <option value="discard">Discard</option>
                        </select>
                      </div>

                      <div
                        className={
                          imagesToDiscard.includes(image) ? "discarded" : ""
                        }
                      >
                        <div className={styles.imgWrapper}>
                          <img
                            src={image.url}
                            alt={image.name}
                            className={styles.image}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </SRLWrapper>
        </div>

        <div className="side-grid-container">
          {imagesToKeep.length > 0 && (
            <>
              <p>
                Keep {imagesToKeep.length} / {total} images
              </p>

              <div className="side-grid">
                {imagesToKeep.map((image, i) => {
                  return <SelectedList key={i} image={image} />;
                })}
              </div>
            </>
          )}

          {imagesToDiscard.length > 0 && (
            <>
              <p className="mt-4">Images to discard</p>

              <div className="side-grid">
                {imagesToDiscard.map((image, i) => {
                  return (
                    <div key={i} className="discarded-images-list">
                      <SelectedList image={image} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewGrid;
