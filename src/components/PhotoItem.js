import React from "react";
import styles from "../css/Album.module.css";

const ImageItem = ({ image, handleSelectedImages }) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.checkbox}>
        <input
          className="custom-checkbox"
          id={image}
          type="checkbox"
          onChange={(e) => handleSelectedImages(image, e)}
        />
      </div>
      <div className={styles.imgWrapper}>
        <img src={image.url} alt={image.name} className={styles.image}></img>
      </div>
    </div>
  );
};

export default ImageItem;
