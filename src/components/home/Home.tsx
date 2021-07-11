import React from "react";
import { Link } from "react-router-dom";
import GroupPhoto from "../../assets/images/groupphoto.jpeg";

export default function Home() {
  return (
    <div className="flex-auto flex flex-col items-center p-2">
      <h1 className="text-xl font-medium mt-2 mb-4">
        Welkom bij EGKaaS Achievements
      </h1>
      <Link
        to="/achievements"
        className="bg-gray-600 hover:bg-gray-500 rounded p-2 w-full sm:w-96 text-center font-semibold"
      >
        Ga naar Achievements
      </Link>
      <img src={GroupPhoto} alt="Groepsfoto" className="sm:w-1/3 mt-4"></img>
      <p>v.l.n.r.v.b.n.o</p>
      <p className="text-center">
        Furkan, Mika, Abe, Geert, Bram, Max, Freek, John en Chiel (+ Guido maar
        die zijn we kwijt)
      </p>
    </div>

    // <div className="flex flex-auto flex-col items-center px-4 pt-4 pb-10 ">
    //   <div className="text-xl text-white mb-8">
    //     Welkom bij de EGKaaS Achievements
    //   </div>
    //   <img
    //     src={GroupPhoto}
    //     alt="Groepsfoto"
    //     className="w-full h-full sm:w-1/3 sm:h-1/2"
    //   ></img>
    //   <p>v.l.n.r.v.b.n.o</p>
    //   <p className="text-center">
    //     Furkan, Mika, Abe, Geert, Bram, Max, Freek, John en Chiel (+ Guido maar
    //     die zijn we kwijt)
    //   </p>
    // </div>
  );
}
