import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function NewScore() {
  const titleRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await firestore.collection("agenda").add({
        //@ts-ignore
        title: titleRef.current.value,
        //@ts-ignore
        date: new Date(dateRef.current.value),
        // @ts-ignore
        location: locationRef.current.value,
        // @ts-ignore
        description: descriptionRef.current.value,
        creationDate: new Date(),
      });

      history.push(`/agenda`);
    } catch {
      setError("Failed to write data");
      setLoading(false);
    }
  }

  return (
    <div className="flex-auto flex flex-col items-center">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <div className="flex flex-row w-full">
          <Link
            to={`/agenda`}
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Nieuw agendaitem
          </h1>{" "}
          <div className="h-8 w-8"></div>
        </div>
      </div>
      <div className="w-full sm:w-1/4">
        {error && (
          <div className="rounded p-2 bg-red-500 text-center font-medium mt-2">
            {error}
          </div>
        )}
        <form
          // @ts-ignore
          onSubmit={handleSubmit}
          className="bg-gray-600 rounded p-4 flex flex-col flex-auto mt-2"
        >
          {/* Name */}
          <section id="title" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Titel</label>
            <input
              className="p-2 rounded"
              placeholder="Titel"
              type="text"
              // @ts-ignore
              ref={titleRef}
              required
            ></input>
          </section>
          <section id="date" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Datum</label>
            <input
              className="p-2 rounded"
              placeholder="date"
              type="date"
              // @ts-ignore
              ref={dateRef}
              required
            ></input>
          </section>
          <section id="location" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Waar</label>
            <input
              className="p-2 rounded"
              placeholder="Waar vindt dit agendaitem plaats?"
              type="text"
              // @ts-ignore
              ref={locationRef}
              required
            ></input>
          </section>
          <section id="description" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Beschrijving</label>
            <textarea
              className="p-2 rounded"
              placeholder="Beschrijving"
              type="textarea"
              // @ts-ignore
              ref={descriptionRef}
              rows={4}
            ></textarea>
          </section>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 rounded p-2 font-medium mt-2"
          >
            Invoeren
          </button>
        </form>
      </div>
    </div>
  );
}
