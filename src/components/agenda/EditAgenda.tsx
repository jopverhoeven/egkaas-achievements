import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";

export default function EditAgenda() {
  let { id } = useParams<{ id: string }>();

  const titleRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleDelete(e: Event) {
    e.preventDefault();

    try {
      setLoading(true);

      await firestore.collection("agenda").doc(id).delete();

      history.push(`/agenda`);
    } catch {
      setError("Kan niet verwijderen");
      setLoading(false);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await firestore
        .collection("agenda")
        .doc(id)
        .set({
          //@ts-ignore
          title: titleRef.current.value,
          //@ts-ignore
          date: new Date(new Date(dateRef.current.value).setHours(23, 59, 59)),
          // @ts-ignore
          location: locationRef.current.value,
          // @ts-ignore
          description: descriptionRef.current.value,
          creationDate: new Date(),
        });

      history.push(`/agenda/${id}`);
    } catch {
      setError("Failed to write data");
      setLoading(false);
    }
  }

  const fetchAgendaItem = useCallback(async () => {
    const agendaDoc = await firestore.collection("agenda").doc(id);

    const agendaData = await agendaDoc.get();

    if (agendaData.exists && agendaData.data() !== undefined) {
      // @ts-ignore
      titleRef.current.value = agendaData.data().title;
      // @ts-ignore
      locationRef.current.value = agendaData.data().location;
      // @ts-ignore
      dateRef.current.value = moment(
        new Date(agendaData.data()!["date"]["seconds"] * 1000)
      ).format("YYYY-MM-DD");
      if (agendaData.data()!.description) {
        // @ts-ignore
        descriptionRef.current.value = agendaData.data().description;
      }
      setLoading(false);
    } else {
      history.push("/agenda");
    }
  }, [id, history]);

  useEffect(() => {
    fetchAgendaItem();

    return () => {};
  }, [fetchAgendaItem]);

  if (loading)
    return (
      <div className="flex-auto flex flex-col items-center">
        <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <Link
              to={`/agenda/${id}`}
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
    <div className="flex-auto flex flex-col items-center">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <div className="flex flex-row w-full">
          <Link
            to={`/agenda/${id}`}
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Wijzig agendaitem
          </h1>{" "}
          <button
            className="flex items-center justify-center rounded bg-gray-500"
            // @ts-ignore
            onClick={handleDelete}
            disabled={loading}
          >
            <TrashIcon className="h-8 w-8 p-1 text-white" />
          </button>
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
          <section
            id="description"
            className="text-black flex flex-col flex-auto"
          >
            <label className="text-white font-semibold text-md">
              Beschrijving
            </label>
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
