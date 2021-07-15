import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import Moment from "react-moment";
import Banner from "../../navigation/Banner";

export default function ScoreDetails() {
  let { id, type } = useParams<{ id: string; type: string }>();
  //@ts-ignore
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [typeExists, setTypeExists] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [score, setScore] = useState();

  const fetchAchievements = useCallback(async () => {
    let localTypeExists = false;
    let localAchievement: any;

    const achievementDoc = await firestore
      .collection("achievements")
      .doc(type.toLowerCase())
      .get();
    if (achievementDoc.exists) {
      localTypeExists = true;

      localAchievement = achievementDoc.data();
      // @ts-ignore
      setAchievement(localAchievement);
      setTypeExists(localTypeExists);
    }

    if (localTypeExists) {
      const achievementScore = firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .collection("scores")
        .doc(id);
      achievementScore.onSnapshot((data) => {
        if (data.exists)
          setScore({
            // @ts-ignore
            id: data.id,
            name: data.data()!.name,
            value: data.data()!.value,
            creationDate: data.data()!.creationDate.seconds * 1000,
          });
      });
    }

    setLoading(false);
  }, [type, id]);

  useEffect(() => {
    fetchAchievements();

    return () => {};
  }, [fetchAchievements]);

  if (loading)
    return (
      <Banner
        {...{
          backButtonUrl: `/achievements/${type}`,
          text: `Laden...`,
          showActionButton: false,
          showDeleteButton: false,
        }}
      />
    );

  if (!typeExists) return <Redirect to={`/achievements/${type}`}></Redirect>;

  if (achievement!["private"] && !currentUser)
    return <Redirect to="/achievements"></Redirect>;

  return (
    <div className="flex-auto flex flex-col items-center bg-gray-800 pb-4">
      <Banner
        {...{
          backButtonUrl: `/achievements/${type}`,
          text: `Highscore ${achievement!["name"]}`,
          showActionButton: true,
          actionButtonText: "Wijzig score",
          actionButtonUrl: `/achievements/${type.toLowerCase()}/${id}/edit`,
          showDeleteButton: false,
        }}
      />

      {score && (
        <div className="w-full sm:w-3/4 md:w-3/4 lg:w-1/4 mt-4 bg-gray-600 sm:rounded p-4">
          <div className="w-full flex justify-between px-2">
            <h1 className="text-2xl font-medium">Naam</h1>
            <h1 className="text-2xl font-medium">
              {String(achievement!["unit"]["full"]).charAt(0).toUpperCase() +
                String(achievement!["unit"]["full"]).slice(1)}
            </h1>
          </div>
          <div className="flex flex-row justify-between p-2 w-full bg-gray-500 rounded ">
            <h1 className="text-lg font-medium">{score!["name"]}</h1>
            <h1 className="text-lg font-medium">
              {score!["value"]}
              {achievement!["unit"]["short"]}
            </h1>
          </div>
          <p className="text-lg font-medium text-center mt-2">
            Score gezet op:{" "}
            <Moment
              format="DD MMMM YYYY HH:mm"
              className="ml-1"
              date={score!["creationDate"]}
            ></Moment>
          </p>
        </div>
      )}
    </div>
  );
}
