import firebaseApp from "../../firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const auth = firebaseApp.auth();

export default function ProfileComponent() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };

  useEffect(() => {
    if (!auth.currentUser) history.push("/");
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 sm:w-1/5 ">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center">
            <img
              className="rounded-full h-16 w-16"
              src={user?.photoURL?.toString()}
              alt="profile"
            ></img>
            <h1 className="ml-4 text-xl font-semibold">{user?.displayName}</h1>
          </div>
        </div>
        <button
          className="p-2 w-full rounded bg-gray-400 text-black mt-4"
          onClick={signOut}
        >
          Uitloggen
        </button>
      </div>
    </div>
  );
}
