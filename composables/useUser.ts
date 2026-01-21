import { onAuthStateChanged } from "firebase/auth";

export const useUser = () => {
  const userId = useState<string>("userId", () => "");

  const setUserId = (id: string) => {
    userId.value = id;
  };

  const clearUserId = () => {
    userId.value = "";
  };

  // Firebase auth listener
  const initAuth = () => {
    const { $firebaseAuth } = useNuxtApp();

    onAuthStateChanged($firebaseAuth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        clearUserId();
      }
    });
  };

  return {
    userId,
    setUserId,
    clearUserId,
    initAuth,
  };
};
