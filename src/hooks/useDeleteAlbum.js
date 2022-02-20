import { useState } from "react";
import useGetAlbums from "../hooks/useGetAlbums";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const useDeleteAlbum = (id) => {
  const { data } = useGetAlbums();
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const mutate = async (album) => {
    setError(null);
    setIsError(false);
    try {
      let imagesToDelete = album.images;
      let allImages = [];
      
      // eslint-disable-next-line array-callback-return
      data.map((album) => {
        album.images.forEach((arrayObject) => {
          allImages.push(arrayObject);
        });
      });

      await deleteDoc(doc(db, "albums", id));

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
    } catch (e) {
      setError(e.message);
      setIsError(true);
    } finally {
      navigate("/");
    }
  };

  return { error, isError, mutate };
};

export default useDeleteAlbum;
