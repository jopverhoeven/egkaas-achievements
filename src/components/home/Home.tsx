import React from "react";
import { Link } from "react-router-dom";
import GroupPhoto from "../../assets/images/groupphoto.jpeg";
import { useAuth } from "../../contexts/auth.context";

export default function Home() {
  // @ts-ignore
  const { currentUser } = useAuth();

  return (
    <div className="flex-auto flex flex-col items-center bg-gray-800 pb-4">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <h1 className="text-3xl font-medium mt-2 mb-4 text-center">
          Welkom bij EGKaaS Achievements
        </h1>
        <div className="flex flex-row ">
          <Link
            to="/achievements"
            className="bg-gray-500 hover:bg-gray-400 rounded p-2 w-full sm:w-96 text-center font-semibold"
          >
            Achievements
          </Link>

          <Link
            to={currentUser ? "/agenda" : ""}
            className={
              currentUser
                ? "bg-gray-500 hover:bg-gray-400 rounded p-2 w-full sm:w-96 text-center font-semibold ml-2"
                : "bg-gray-800  rounded p-2 w-full sm:w-96 text-center font-semibold ml-2 cursor-default"
            }
          >
            Agenda
          </Link>
        </div>
      </div>
      <img src={GroupPhoto} alt="Groepsfoto" className="sm:w-1/3 mt-4"></img>
      <p>v.l.n.r.v.b.n.o</p>
      <p className="text-center">
        Furkan, Mika, Abe, Geert, Bram, Max, Freek, John en Chiel (en Guido maar
        die zijn we kwijt)
      </p>
    </div>
  );
}
