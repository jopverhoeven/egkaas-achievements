import { ArrowLeftIcon } from "@heroicons/react/solid";
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
    <div className="flex flex-col items-center">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <div className="flex flex-row w-full">
          <Link to="/" className="flex items-center justify-center rounded bg-gray-500">
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">Kies een categorie</h1>
          <div className="h-8 w-8"></div>
        </div>
      </div>
      <div className="flex flex-row w-full sm:w-1/3 justify-between">
        {achievements.map(function (obj, i) {
          return (
            <Link
              key={i}
              to={`/achievements/${obj}`}
              className="m-4 p-4 rounded bg-gray-600 hover:bg-gray-500 w-1/3 sm:w-40 h-24 sm:h-40 flex items-center justify-center text-xl font-semibold"
            >
              {String(obj).charAt(0).toUpperCase() + String(obj).slice(1)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
