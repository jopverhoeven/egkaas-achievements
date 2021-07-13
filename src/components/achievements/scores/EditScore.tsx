import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
// import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";

export default function EditScore() {
  let { id, type } = useParams<{ id: string; type: string }>();

  const [loading, setLoading] = useState(true);
  const [typeExists, setTypeExists] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [error, setError] = useState("");

  const history = useHistory();

  const nameRef = useRef();
  const valueRef = useRef();

  const fetchAchievements = useCallback(async () => {
    let localTypeExists = false;
    let localAchievement;

    const achievementCollection = firestore.collection("achievements");
    const achievementCollectionDocs = await achievementCollection.get();

    for (
      let index = 0;
      index < achievementCollectionDocs.docs.length;
      index++
    ) {
      const element = achievementCollectionDocs.docs[index];
      if (element.id.toLowerCase() === type.toLowerCase())
        localTypeExists = true;
    }

    setTypeExists(localTypeExists);

    if (localTypeExists) {
      const achievementCollectionDoc = await firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .get();

      localAchievement = achievementCollectionDoc.data();
      //@ts-ignore
      setAchievement(localAchievement);

      setLoading(false);

      const achievementScore = await firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .collection("scores")
        .doc(id)
        .get();

      if (achievementScore.exists && achievementScore.data() !== undefined) {
        // @ts-ignore
        nameRef.current.value = achievementScore.data().name;
        // @ts-ignore
        valueRef.current.value = achievementScore.data().value;
      }
    } else {
      setLoading(false);
    }
  }, [type, id]);

  useEffect(() => {
    fetchAchievements();

    return () => {};
  }, [fetchAchievements]);

  async function handleDelete(e: Event) {
    e.preventDefault();

    try {
      setLoading(true);

      await firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .collection("scores")
        .doc(id)
        .delete();

      history.push(`/achievements/${type.toLowerCase()}`);
    } catch {
      setError("Kan niet verwijderen");
      setLoading(false);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setLoading(true);

      await firestore
        .collection("achievements")
        .doc(`${type.toLowerCase()}`)
        .collection("scores")
        .doc(`${id}`)
        .set({
          //@ts-ignore
          name: nameRef.current.value,
          //@ts-ignore
          value: +valueRef.current.value,
          creationDate: new Date(),
        });

      history.push(`/achievements/${type.toLowerCase()}`);
    } catch {
      setError("Failed to write data");
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="flex-auto flex flex-col items-center">
        <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <Link
              to="/achievements"
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

  if (!typeExists) return <Redirect to={`/achievements/${type}`}></Redirect>;

  return (
    <div className="flex-auto flex flex-col items-center">
      <div className="w-full p-2 bg-gray-600 flex flex-col items-center">
        <div className="flex flex-row w-full">
          <Link
            to={`/achievements/${type}`}
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Wijzig {achievement!["name"]}
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
          {/* Naam */}
          <section id="name" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Naam</label>
            <input
              // @ts-ignore
              ref={nameRef}
              className="p-2 rounded"
              type="text"
              required
            ></input>
          </section>

          {/* Waarde */}
          <section id="value" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              {String(achievement!["unit"]["full"]).charAt(0).toUpperCase() +
                String(achievement!["unit"]["full"]).slice(1)}
            </label>
            {/* @ts-ignore */}
            <input
              className="p-2 rounded"
              // @ts-ignore
              ref={valueRef}
              type="number"
              placeholder="0"
              min="0"
              step=".01"
              required
            ></input>
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
