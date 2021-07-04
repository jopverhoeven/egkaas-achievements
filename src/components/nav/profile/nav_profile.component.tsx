import firebaseApp from "../../../firebase";
import firebase from "firebase";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const auth = firebaseApp.auth();
export default function NavProfileComponent() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      {user ? (
        <Link to="/profile">
          <button className="flex flex-row items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={user.photoURL?.toString()}
              alt="profile"
            ></img>
            <p className="text-lg font-semibold ml-2">{user.displayName}</p>
          </button>
        </Link>
      ) : (
        <button onClick={signInWithGoogle}>Inloggen</button>
      )}
    </div>
  );
}
