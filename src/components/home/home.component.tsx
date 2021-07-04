import React from "react";
import GroupPhoto from "../../assets/images/groupphoto.jpeg";

export default function HomeComponent() {
  return (
    <div className="flex flex-col items-center px-4 pt-4 pb-10 bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800 text-white">
      <div className="text-xl text-white mb-8">Welkom bij de EGKaaS Achievements</div>
      <img src={GroupPhoto} alt="Groepsfoto" className="w-full h-full sm:w-1/3 sm:h-1/2"></img>
      <p>v.l.n.r.v.b.n.o</p>
      <p className="text-center">
        Furkan, Mika, Abe, Geert, Bram, Max, Freek, John en Chiel (+ Guido maar
        die zijn we kwijt)
      </p>
    </div>
  );
}
