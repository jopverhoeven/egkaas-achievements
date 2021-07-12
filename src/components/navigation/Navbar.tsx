import React from "react";
import { Link } from "react-router-dom";
import BeerBanner from "../../assets/images/beerbanner.jpg";
import { useAuth } from "../../contexts/auth.context";

export default function Navbar() {
  // @ts-ignore
  const { currentUser, logout } = useAuth();
  
  return (
    <div
      className="h-72 flex-shrink-0 sm:h-72 flex flex-col"
      style={{
        backgroundImage: "url(" + BeerBanner + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {currentUser && (
        <div className="flex h-8 bg-gray-900 bg-opacity-75 justify-center items-center">
          Ingelogd als admin
          <button className="ml-2 font-bold" onClick={logout}>Uitloggen</button>
        </div>
      )}
      {!currentUser && (
        <div className="flex h-8 bg-gray-900 bg-opacity-75 justify-center items-center">
          <Link to="/login" className="ml-4 font-bold">
            Inloggen
          </Link>
        </div>
      )}
      <div className="flex h-16 bg-gray-800 bg-opacity-50 justify-center items-center">
        <h1 className="text-2xl font-semibold">
          {" "}
          <Link to="/">EGKaaS Achievements</Link>
        </h1>
      </div>
    </div>
  );
}
