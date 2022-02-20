import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useGetAlbum = (id) => {
  const collectionRef = collection(db, "albums");
  const ref = doc(collectionRef, id);

  const document = useFirestoreDocumentData(["albums", id], ref, {
    subscribe: true,
  });

  let album = document.data;

  return album;
};

export default useGetAlbum;
