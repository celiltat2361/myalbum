import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const useEditAlbum = (id) => {
  const mutate = async (title) => {
    const ref = doc(db, "albums", id);
    await updateDoc(ref, {
      name: title,
    });
  };

  return { mutate };
};

export default useEditAlbum;
