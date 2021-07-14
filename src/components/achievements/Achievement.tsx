import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { firestore } from "../../firebase";

export default function Achievement() {
  const [achievements, setAchievements] = useState([]);
  //@ts-ignore
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const response = firestore.collection("achievements");
    response.onSnapshot((data) => {
      setAchievements(
        //@ts-ignore
        data.docs.map((item) => ({
          id: item.id,
          name: item.data()["name"],
          private: item.data()["private"],
        }))
      );
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-800">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <div className="flex flex-row w-full">
          <Link
            to="/"
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Kies een categorie
          </h1>
          <div className="h-8 w-8"></div>
        </div>
        {currentUser && (
          <Link
            to={`/achievements/new`}
            className="p-1 mt-2 rounded bg-gray-500 hover:bg-gray-400"
          >
            Voeg een nieuwe categorie toe
          </Link>
        )}
      </div>
      <div className="flex flex-row w-full  md:w-2/3 lg:w-1/2 justify-center flex-wrap sm:gap-x-2">
        {achievements.map(function (obj, i) {
          if (!obj["private"] || (obj["private"] && currentUser))
            return (
              <Link
                key={i}
                to={`/achievements/${obj["id"]}`}
                className="p-4 mt-2 mx-2 sm:mx-0 last:mb-2 rounded bg-gray-600 hover:bg-gray-500 w-full sm:w-40 h-24 sm:h-40 flex items-center justify-center text-xl font-semibold text-center"
              >
                {String(obj["name"]).charAt(0).toUpperCase() +
                  String(obj["name"]).slice(1)}
              </Link>
            );
          else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
