import React from "react";
import GroupPhoto from "../../assets/images/groupphoto.jpeg";

export default function HomeComponent() {
  return (
    <div className="flex flex-col items-center">
      <div>Welkom bij de EGKaaS Achievements</div>
      <img src={GroupPhoto} alt="Groepsfoto" className="w-1/3 h-1/2"></img>
      <p>v.l.n.r.v.b.n.o</p>
      <p>
        Furkan, Mika, Abe, Geert, Bram, Max, Freek, John en Chiel (+ Guido maar
        die zijn we kwijt)
      </p>
    </div>
  );
}
