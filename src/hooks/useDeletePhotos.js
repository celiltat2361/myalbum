import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import useGetAlbums from "../hooks/useGetAlbums";

const useDeletePhotos = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const { data } = useGetAlbums();

  const mutate = async (imagesToDelete, album) => {
    setError(null);
    setIsError(false);
    setIsMutating(true);

    try {
     
      let originalArray = album.images;

      let newArray = originalArray.filter(
        (item) => !imagesToDelete.includes(item)
      );

      const collectionRef = collection(db, "albums");

      const ref = doc(collectionRef, id);

      await updateDoc(ref, {
        images: newArray,
      });
    } catch (e) {
      setError(e.message);
      setIsError(true);
    } finally {
      setIsMutating(false);

      let allImages = [];

      // eslint-disable-next-line array-callback-return
      data.map((album) => {
        album.images.forEach((arrayObject) => {
          allImages.push(arrayObject);
        });
      });

      imagesToDelete.forEach(async (object) => {
        let matches = allImages.filter(
          (anyObject) => object.uuid === anyObject.uuid
        );

        if (matches?.length > 1) {
          return;
        } else {
          await deleteObject(ref(storage, object.path));
        }
      });
    }
  };

  return {
    error,
    isError,
    isMutating,
    mutate,
  };
};

export default useDeletePhotos;
