import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { firestore } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Moment from "react-moment";

export default function AgendaDetails() {
  let { id } = useParams<{ id: string }>();
  //@ts-ignore
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [agenda, setAgenda] = useState();

  const history = useHistory();

  const fetchAchievements = useCallback(async () => {
    const agendaDoc = await firestore.collection("agenda").doc(id);

    agendaDoc.onSnapshot((item) => {
      if (item.exists) {
        setAgenda({
          // @ts-ignore
          title: item.data()!["title"],
          location: item.data()!["location"],
          date: item.data()!["date"]["seconds"] * 1000,
          description: item.data()!["description"]
        });
        setLoading(false);
      } else {
        history.push("/agenda");
      }
    });
  }, [id, history]);

  useEffect(() => {
    fetchAchievements();

    return () => {};
  }, [fetchAchievements]);

  if (loading)
    return (
      <div className="flex-auto flex flex-col items-center">
        <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <Link
              to="/agenda"
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

  return (
    <div className="flex-auto flex flex-col items-center bg-gray-800 pb-4">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center sticky top-0 z-50 shadow-3xl">
        <div className="flex flex-row w-full">
          <Link
            to={`/agenda`}
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            {agenda!["title"]}
          </h1>{" "}
          <div className="h-8 w-8"></div>
        </div>

        {currentUser && (
          <Link
            to={`/agenda/${id}/edit`}
            className="p-1 mt-2 rounded bg-gray-500 hover:bg-gray-400"
          >
            Wijzig agendaitem
          </Link>
        )}
      </div>

      {agenda && (
        <div className="w-full sm:w-1/4 mt-4 bg-gray-600 sm:rounded p-4">
          <div className="flex flex-row justify-center px-2 w-full mt-2">
            <h1 className="text-2xl font-semibold text-center">
              {agenda!["title"]}
            </h1>
          </div>
          <div className="text-center">
            <Moment
              format="DD MMMM YYYY"
              className="text-xl font-semibold"
              date={agenda!["date"]}
            ></Moment>
          </div>
          <div className="flex flex-col bg-gray-500 p-2 rounded mt-1">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Locatie</h1>
              <p className="text-lg">{agenda!["location"]}</p>
            </div>
            {agenda!["description"] && (
              <div className="flex flex-col mt-2r">
                <h1 className="text-lg font-semibold">Beschrijving</h1>
                <p className="text-lg">{agenda!["description"]}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
