import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

export default function Achievement() {
  const [agenda, setAgenda] = useState([]);
  const [agendaHistory, setAgendaHistory] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const agendaCollection = firestore
      .collection("agenda")
      .where("date", ">=", new Date())
      .orderBy("date", "asc");
    agendaCollection.onSnapshot((data) => {
      setAgenda(
        //@ts-ignore
        data.docs.map((item) => ({
          id: item.id,
          title: item.data()!["title"],
          location: item.data()!["location"],
          date: item.data()!["date"]["seconds"] * 1000,
        }))
      );
    });

    const agendaHistoryCollection = firestore
      .collection("agenda")
      .where("date", "<", new Date())
      .orderBy("date", "desc");
    agendaHistoryCollection.onSnapshot((data) => {
      setAgendaHistory(
        //@ts-ignore
        data.docs.map((item) => ({
          id: item.id,
          title: item.data()!["title"],
          location: item.data()!["location"],
          date: item.data()!["date"]["seconds"] * 1000,
        }))
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center sticky top-0 z-50 shadow-3xl">
        <div className="flex flex-row w-full">
          <Link
            to="/"
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">Agenda</h1>
          <div className="h-8 w-8"></div>
        </div>
        <Link
          to={`/agenda/new`}
          className="p-1 mt-2 rounded bg-gray-500 hover:bg-gray-400"
        >
          Voeg een nieuw agendaitem toe
        </Link>
      </div>
      <div className="flex flex-row w-full sm:w-3/4 md:w-3/4 lg:w-1/3 justify-between flex-wrap p-2">
        {agenda.map(function (obj, i) {
          return (
            <Link
              key={i}
              to={`/agenda/${obj!["id"]}`}
              className="group p-4 w-full bg-gray-600 hover:bg-gray-500 my-1 rounded flex flex-row"
            >
              <div className="p-1 w-24 h-16 flex-shrink-0 flex flex-col bg-gray-500 group-hover:bg-gray-400 rounded">
                <Moment
                  format="DD MMM"
                  date={obj!["date"]}
                  className="text-2xl font-semibold text-center"
                ></Moment>
                <Moment
                  format="yyyy"
                  date={obj!["date"]}
                  className="text-md font-semibold text-center"
                ></Moment>
              </div>
              <div className="ml-4 flex-auto flex flex-col items-center justify-center">
                <h1 className="text-center font-semibold text-xl">
                  {String(obj!["title"]).charAt(0).toUpperCase() +
                    String(obj!["title"]).slice(1)}
                </h1>
                <p className="text-center">
                  Locatie:{" "}
                  {String(obj!["location"]).charAt(0).toUpperCase() +
                    String(obj!["location"]).slice(1)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {agendaHistory.length > 0 && (
        <div className="flex flex-col w-full items-center sm:w-3/4 md:w-3/4 lg:w-1/3 p-2">
          <h1 className="w-full text-left text-xl font-semibold">Geschiedenis</h1>
          <div className="flex flex-row w-full justify-between flex-wrap">
            {agendaHistory.map(function (obj, i) {
              return (
                <Link
                  key={i}
                  to={`/agenda/${obj!["id"]}`}
                  className="group p-4 w-full bg-gray-600 hover:bg-gray-500 my-1 rounded flex flex-row"
                >
                  <div className="w-20 flex-shrink-0 flex flex-col bg-gray-500 group-hover:bg-gray-400 rounded">
                    <Moment
                      format="DD MMM"
                      date={obj!["date"]}
                      className="text-2xl font-semibold text-center"
                    ></Moment>
                    <Moment
                      format="yyyy"
                      date={obj!["date"]}
                      className="text-md font-semibold text-center"
                    ></Moment>
                  </div>
                  <div className="flex-auto flex flex-col items-center justify-center">
                    <h1 className="text-center font-semibold text-xl">
                      {String(obj!["title"]).charAt(0).toUpperCase() +
                        String(obj!["title"]).slice(1)}
                    </h1>
                    <p className="text-left">
                      Locatie:{" "}
                      {String(obj!["location"]).charAt(0).toUpperCase() +
                        String(obj!["location"]).slice(1)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
