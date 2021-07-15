import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import Banner from "../../navigation/Banner";

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
    let localAchievement: any;

    const achievementDoc = await firestore
      .collection("achievements")
      .doc(type.toLowerCase())
      .get();
    if (achievementDoc.exists) {
      localTypeExists = true;
      setTypeExists(localTypeExists);

      localAchievement = achievementDoc.data();
      // @ts-ignore
      setAchievement(localAchievement);
    }

    if (localTypeExists) {
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
    }

    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  if (loading)
    return (
      <Banner
        {...{
          backButtonUrl: `/achievements`,
          text: `Laden...`,
          showActionButton: false,
          showDeleteButton: false,
        }}
      />
    );

  if (!typeExists)
    return (
      <Banner
        {...{
          backButtonUrl: `/achievements`,
          text: `De achievement '${type}' bestaat niet`,
          showActionButton: false,
          showDeleteButton: false,
        }}
      />
      
    );

  if (achievement!["private"] && !currentUser)
    return <Redirect to="/achievements"></Redirect>;

  return (
    <div className="flex-auto flex flex-col items-center bg-gray-800 pb-4">
      <Banner
        {...{
          backButtonUrl: `/achievements`,
          text: `Highscores ${achievement!["name"]}`,
          showActionButton: true,
          actionButtonText: "Voeg een nieuwe score toe",
          actionButtonUrl: `/achievements/${type.toLowerCase()}/new`,
          showDeleteButton: false,
        }}
      />

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
