import firebaseApp from "../../firebase";

import "firebase/firestore";
import "firebase/auth";

import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Scoreboard from "./scoreboard.interface";
import { Link, Route, Switch } from "react-router-dom";
import AchievementComponent from "../achievement/achievement.component";
import ScoreboardFormComponent from "./form/scoreboard_form.component";

const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();

export default function ScoreboardComponent(props: Scoreboard) {
  
  const [user] = useAuthState(auth);

  const usersCollection = firestore.collection("users");
  let userQuery;
  
  if (user) {
    userQuery = usersCollection.doc(user?.email!);
  }

  const [userSnapshot] = useDocument(userQuery);

  const atjesRef = firestore.collection(props.collection.toString());
  const query = atjesRef
    .orderBy(props.type.toString(), props.direction || "asc")
    .limit(props.limit || 25);

  const [achievements] = useCollectionData(query, { idField: "id" });

  return (
    <Switch>
      <Route path={"/" + props.collection.toString()} exact>
        <div className="flex flex-col items-center">
          <div className="text-3xl text-gray-200">
            Top {props.limit ? props.limit : 25} {props.name}
          </div>
          {userSnapshot?.data()?.admin && (
            <Link to={`${props.collection.toString()}/new`}>
              <button className="p-2 bg-gray-500 rounded mt-4 hover:bg-gray-400 transform transition duration-300 ease-in-out hover:scale-105">
                Nieuwe {props.type} toevoegen
              </button>
            </Link>
          )}
          <div className="flex flex-col w-full sm:w-1/2 mt-4">
            <div className="flex flex-row justify-between mx-4 sm:mx-20 px-4 font-bold">
              <div>naam</div>
              <div>{props.type}</div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mt-4">
            {achievements &&
              achievements.map((achievement) => (
                <Link
                  to={`/${props.collection}/${achievement.id}`}
                  key={`${achievement.id}`}
                >
                  <div className="flex flex-row justify-between mx-4 sm:mx-20 p-4 bg-gray-500 rounded mb-2 hover:bg-gray-400 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
                    <div>{achievement.name}</div>
                    <div>{achievement[props.type]}</div>
                  </div>
                </Link>
              ))}
            {!achievements ? (
              <div className="mx-4 sm:mx-20 p-4">Laden...</div>
            ) : null}
          </div>
        </div>
      </Route>
      <Route path={`/${props.collection.toString()}/new`} exact>
        <ScoreboardFormComponent
          {...{
            collection: props.collection,
            name: props.name,
            type: props.type,
          }}
        ></ScoreboardFormComponent>
      </Route>
      <Route path={`/${props.collection.toString()}/:id`} exact>
        <AchievementComponent
          {...{
            collection: props.collection,
            name: props.name,
            type: props.type,
          }}
        ></AchievementComponent>
      </Route>
    </Switch>
  );
}
