import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";
import usePhotoUpload from "../hooks/usePhotoUpload";

const PhotoDropZone = ({ albumId }) => {
  const uploadPhoto = usePhotoUpload(albumId);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    uploadPhoto.mutate(acceptedFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      id="upload-image-dropzone-wrapper"
      className={`${isDragAccept ? "drag-accept" : ""} ${
        isDragReject ? "drag-reject" : ""
      }`}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        isDragAccept ? (
          <p>Drop images</p>
        ) : (
          <p>This file is not supported</p>
        )
      ) : (
        <p>Upload photos</p>
      )}

      {acceptedFiles.length > 0 && (
        <div className="accepted-files mt-2">
          <ul className="list-unstyled">
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                {file.name} ({Math.round(file.size / 1024)} kb)
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadPhoto.uploadProgress !== null && (
        <ProgressBar
          variant="success"
          animated
          now={uploadPhoto.uploadProgress}
        />
      )}

      {uploadPhoto.isError && (
        <Alert variant="warning">{uploadPhoto.error}</Alert>
      )}
      {uploadPhoto.isSuccess && (
        <Alert variant="success">Images uploaded!</Alert>
      )}
    </div>
  );
};

export default PhotoDropZone;
