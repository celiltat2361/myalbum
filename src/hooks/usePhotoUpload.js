import { useState } from "react";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";

const usePhotoUpload = (albumId) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const mutate = async (image) => {
    setIsMutating(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    if (!image) {
      return;
    }

    image.forEach((image) => {
      
      const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

      const uuid = uuidv4();

      const fileRef = ref(storage, `images/${uuid}.${ext}`);

      const uploadTask = uploadBytesResumable(fileRef, image);

      uploadTask.on(
        "state_changed",
        (uploadTaskSnapshot) => {
          setUploadProgress(
            Math.round(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
                100
            )
          );
        },
        (e) => {
          console.log("Error:", e);

          setError(
            `Image failed to upload due to the following error: ${e.message}`
          );
          setIsError(true);
          setIsMutating(false);
        },
        async () => {
          const url = await getDownloadURL(fileRef);

          const collectionRef = collection(db, "albums");

          const ref = doc(collectionRef, albumId);

          await updateDoc(ref, {

            images: arrayUnion({
              path: fileRef.fullPath,
              name: image.name,
              size: image.size,
              type: image.type,
              ext,
              uuid,
              url,
            }),
          });

          setIsMutating(false);
          setIsSuccess(true);
          setUploadProgress(null);
        }
      );
    });
  };

  return {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
    uploadProgress,
  };
};

export default usePhotoUpload;
