import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useUserContext } from "../contexts/UserContext";

const useGetAlbums = () => {
  const { currentUser } = useUserContext();

  const queryRef = query(
    collection(db, "albums"),
    where("owner", "==", currentUser.uid)
  );

  const { data, isLoading } = useFirestoreQueryData(
    ["albums"],
    queryRef,
    {
      idField: "id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return { data, isLoading };
};

export default useGetAlbums;
