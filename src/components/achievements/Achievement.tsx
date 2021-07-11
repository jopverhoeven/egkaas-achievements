import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

export default function Achievement() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const response = firestore.collection("achievements");
    response.onSnapshot((data) => {
      //@ts-ignore
      setAchievements(data.docs.map((items) => items.id));
    });
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-xl font-medium">Selecteer een categorie</h1>
      <div className="flex flex-row w-full sm:w-1/3 justify-between">
        {achievements.map(function (obj, i) {
          return (
            <Link key={i} to={`/achievements/${obj}`} className=" m-4 p-4 rounded bg-gray-600 hover:bg-gray-500 w-1/3 sm:w-40 h-24 sm:h-40 flex items-center justify-center text-lg">{obj}</Link>
          );
        })}
      </div>
    </div>
  );
}
