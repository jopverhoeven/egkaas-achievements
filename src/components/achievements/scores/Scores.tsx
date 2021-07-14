import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function Scores() {
  let { type } = useParams<{ type: string }>();
  //@ts-ignore
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [typeExists, setTypeExists] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [scores, setScores] = useState([]);

  const fetchAchievements = useCallback(async () => {
    let localTypeExists = false;
    let localAchievement;

    const achievementCollection = firestore.collection("achievements");
    const achievementCollectionDocs = await achievementCollection.get();

    for (
      let index = 0;
      index < achievementCollectionDocs.docs.length;
      index++
    ) {
      const element = achievementCollectionDocs.docs[index];
      if (element.id.toLowerCase() === type.toLowerCase())
        localTypeExists = true;
    }

    setTypeExists(localTypeExists);

    if (localTypeExists) {
      const achievementCollectionDoc = await firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .get();

      localAchievement = achievementCollectionDoc.data();
      //@ts-ignore
      setAchievement(localAchievement);

      setLoading(false);

      const achievementScoresCollection = firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .collection("scores")
        .orderBy("value", localAchievement!["sort"]);
      achievementScoresCollection.onSnapshot((data) => {
        setScores(
          // @ts-ignore
          data.docs.map((data) => ({
            id: data.id,
            name: data.data().name,
            value: data.data().value,
          }))
        );
      });
    } else {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  if (loading)
    return (
      <div className="flex-auto flex flex-col items-center">
        <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <Link
              to="/achievements"
              className="flex items-center justify-center rounded bg-gray-500"
            >
              <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
            </Link>
            <h1 className="flex-auto text-3xl font-medium text-center">
              Laden...
            </h1>{" "}
            <div className="h-8 w-8"></div>
          </div>
        </div>
      </div>
    );

  if (!typeExists) return <div>{type} bestaat niet in de Achievements</div>;

  if (achievement!["private"] && !currentUser)
    return <Redirect to="/achievements"></Redirect>;

  return (
    <div className="flex-auto flex flex-col items-center bg-gray-800 pb-4">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center sticky top-0 z-50 shadow-3xl">
        <div className="flex flex-row w-full">
          <Link
            to="/achievements"
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Highscores {achievement!["name"]}
          </h1>{" "}
          <div className="h-8 w-8"></div>
        </div>

        {currentUser && (
          <Link
            to={`/achievements/${type.toLowerCase()}/new`}
            className="p-1 mt-2 rounded bg-gray-500 hover:bg-gray-400"
          >
            Voeg een nieuwe score toe
          </Link>
        )}
      </div>

      {currentUser && <div></div>}
      {scores.length > 0 && (
        <div className="w-full sm:w-3/4 md:w-3/4 lg:w-1/4 mt-4 bg-gray-600 sm:rounded p-4">
          <div className="w-full flex justify-between px-2">
            <h1 className="text-2xl font-medium">Naam</h1>
            <h1 className="text-2xl font-medium">
              {String(achievement!["unit"]["full"]).charAt(0).toUpperCase() +
                String(achievement!["unit"]["full"]).slice(1)}
            </h1>
          </div>
          {scores.map(function (obj, i) {
            return (
              <Link
                to={`/achievements/${type.toLowerCase()}/${obj["id"]}`}
                key={i}
                className="w-full flex flex-row justify-between p-2 mt-2 bg-gray-500 hover:bg-gray-400 rounded"
              >
                <h1 className="text-lg font-medium">
                  #{i + 1} {obj["name"]}
                </h1>
                <h1 className="text-lg font-medium">
                  {obj["value"]}
                  {achievement!["unit"]["short"]}
                </h1>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
