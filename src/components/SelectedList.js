/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const SelectedList = ({ image }) => {
  return (
    <div className="selected-images">
      <img
        src={image.url}
        alt="image"
        style={{ width: "100%", height: "100%" }}
      ></img>
    </div>
  );
};

export default SelectedList;
