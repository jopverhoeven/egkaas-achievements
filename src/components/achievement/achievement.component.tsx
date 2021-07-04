import { useParams } from "react-router-dom";
import Moment from "react-moment";

import { firebase } from "../../firebase";

import "firebase/firestore";

import { useDocument } from "react-firebase-hooks/firestore";
import Achievement from "./achievement.interface";

const firestore = firebase.firestore();

export default function AchievementComponent(props: Achievement) {
  // @ts-ignore: id is lazy loaded
  let { id } = useParams();
  const collection = firestore.collection(props.collection);
  const query = collection.doc(id);

  const [snapshot, loading, error] = useDocument(query);
  let data;
  if (snapshot) {
    data = snapshot.data();
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {snapshot && (
        <div className="flex flex-col items-center w-full">
          <div className="text-3xl text-gray-200 text-center">
            <h1>{props.name}</h1>
          </div>
          {data?.created && (
            <div className="text-sm">
              Achievement gezet op{" "}
              <Moment format="D MMMM 'YY hh:mm" locale="nl">
                {data?.created.seconds * 1000}
              </Moment>
            </div>
          )}
          <div className="flex flex-col w-full px-4 mt-10 sm:w-1/4 sm:px-10">
            <div className="font-bold">Naam</div>
            <div>{data?.name}</div>
            <div className="font-bold mt-2">Achievement type</div>
            <div>{props.name}</div>
            <div className="font-bold mt-2">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</div>
            {/* @ts-ignore */}
            <div>{data[props.type]}</div>
          </div>
        </div>
      )}
    </div>
  );
}
