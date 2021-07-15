import React, { useCallback, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
// import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../../firebase";
import Banner from "../../navigation/Banner";

export default function NewScore() {
  let { type } = useParams<{ type: string }>();
  const nameRef = useRef();
  const valueRef = useRef();

  const [loading, setLoading] = useState(true);
  const [typeExists, setTypeExists] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();

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

    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      firestore
        .collection("achievements")
        .doc(`${type.toLowerCase()}`)
        .collection("scores")
        .add({
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
          backButtonUrl: `/achievements/${type}`,
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
          backButtonUrl: `/achievements/${type}`,
          text: `Nieuwe ${achievement!["name"]}`,
          showActionButton: false,
          showDeleteButton: false,
        }}
      />
      <div className="w-full sm:w-3/4 md:w-3/4 lg:w-1/4">
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
          <section id="name" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Naam</label>
            <input
              className="p-2 rounded"
              placeholder="naam"
              type="text"
              // @ts-ignore
              ref={nameRef}
              required
            ></input>
          </section>
          {/* Value */}
          <section id="value" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              {String(achievement!["unit"]["full"]).charAt(0).toUpperCase() +
                String(achievement!["unit"]["full"]).slice(1)}
            </label>
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
