import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import ScoreboardForm from "./scoreboard_form.interface";

import firebaseApp from "../../../firebase";

import "firebase/firestore";
import "firebase/auth";

import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();

export default function ScoreboardFormComponent(props: ScoreboardForm) {
  const [user] = useAuthState(auth);
  console.log(user?.displayName);
  const history = useHistory();

  const usersCollection = firestore.collection("users");
  const userQuery = usersCollection.doc(user?.email!);

  const [userSnapshot, loading] = useDocument(userQuery);

  // @ts-ignore
  let userData;
  if (userSnapshot) {
    userData = userSnapshot.data();
  }

  useEffect(() => {
    if (loading) return;

    if (!props) {
      history.push("/");
    }

    if (!auth.currentUser) {
      history.push("/");
    }

    if (!userSnapshot?.exists) {
      history.push("/");
    } else {
      // @ts-ignore
      if (!userData.admin) {
        history.push("/");
      }
    }
  // eslint-disable-next-line
  }, [loading]);

  return <div>Invulformulier</div>;
}
