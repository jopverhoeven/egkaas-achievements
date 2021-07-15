import React, { useCallback, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
// import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import Banner from "../../navigation/Banner";

export default function EditScore() {
  let { id, type } = useParams<{ id: string; type: string }>();

  const [loading, setLoading] = useState(true);
  const [typeExists, setTypeExists] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  const history = useHistory();

  const nameRef = useRef(null);
  const valueRef = useRef(null);

  const fetchAchievements = useCallback(async () => {
    let localTypeExists = false;
    let localAchievement: any;

    const achievementDoc = await firestore
      .collection("achievements")
      .doc(type.toLowerCase())
      .get();
    if (achievementDoc.exists) {
      localTypeExists = true;

      localAchievement = achievementDoc.data();
      // @ts-ignore
      setAchievement(localAchievement);
      setTypeExists(localTypeExists);
    }

    if (localTypeExists) {
      const achievementScore = await firestore
        .collection("achievements")
        .doc(type.toLowerCase())
        .collection("scores")
        .doc(id)
        .get();

      if (!achievementScore.exists) history.push(`/achievements/${type}`);

      // @ts-ignore
      setScore(achievementScore.data());
    }
    setLoading(false);
  }, [type, id, history]);

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
      <Banner
        {...{
          backButtonUrl: `/achievements/${type}/${id}`,
          text: `Laden...`,
          showActionButton: false,
          showDeleteButton: false,
        }}
      />
    );

  if (!typeExists) return <Redirect to={`/achievements/${type}`}></Redirect>;

  return (
    <div className="flex-auto flex flex-col items-center">
      <Banner
        {...{
          backButtonUrl: `/achievements/${type}/${id}`,
          text: `Wijzig ${achievement!["name"]}`,
          showActionButton: false,
          showDeleteButton: true,
          deleteButtonFunction: handleDelete,
          deleteButtonLoading: loading,
        }}
      />
      <div className="w-full sm:w-3/4 md:w-3/4 lg:w-1/4">
        {error && (
          <div className="rounded p-2 bg-red-500 text-center font-medium mt-2">
            {error}
          </div>
        )}
        {score && (
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
                defaultValue={score!["name"]}
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
                defaultValue={score!["value"]}
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
        )}
      </div>
    </div>
  );
}
