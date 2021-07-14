import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../../../contexts/auth.context";
import { firestore } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function NewAchievement() {
  const storeRef = useRef();
  const nameRef = useRef();
  const unitFullRef = useRef();
  const unitShortRef = useRef();
  const [sort, setSort] = useState("asc");
  const [privacy, setPrivate] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  const handlePrivate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value === "true" ? setPrivate(true) : setPrivate(false);
  };

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      firestore
        .collection("achievements")
        // @ts-ignore
        .doc(storeRef.current.value)
        .set({
          // @ts-ignore
          name: nameRef.current.value,
          sort: sort,
          unit: {
            // @ts-ignore
            short: unitShortRef.current.value,
            // @ts-ignore
            full: unitFullRef.current.value,
          },
          private: privacy,
        });

      history.push(`/achievements`);
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
            to={`/achievements`}
            className="flex items-center justify-center rounded bg-gray-500"
          >
            <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
          </Link>
          <h1 className="flex-auto text-3xl font-medium text-center">
            Nieuwe Categorie Toevoegen
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
          <div className="flex flex-col rounded bg-gray-500 p-2">
            <h1 className="font-semibold">Voorbeeld:</h1>
            <div className="ml-2 flex flex-col">
              <h1>Opslagnaam: 'adtje'</h1>
              <h1>Weergavenaam: 'Adtjes Trekken'</h1>
              <h1>Eenheid: 'Tijd', 's'</h1>
              <h1>Sorteermethode: 'Laag naar Hoog'</h1>
            </div>
          </div>
          <section
            id="storename"
            className="text-black flex flex-col flex-auto mt-2"
          >
            <label className="text-white font-semibold text-md">
              Opslagnaam - ALLES KLEIN EN AAN ELKAAR!!!
            </label>
            <input
              className="p-2 rounded"
              placeholder="bv: 'adtje'"
              type="text"
              // @ts-ignore
              ref={storeRef}
              required
            ></input>
          </section>
          <section id="name" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              Weergavenaam
            </label>
            <input
              className="p-2 rounded"
              placeholder="bv: 'Adtjes Trekken'"
              type="text"
              // @ts-ignore
              ref={nameRef}
              required
            ></input>
          </section>
          {/* Value */}
          <section id="unit" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">Eenheid</label>
            <input
              className="p-2 rounded"
              // @ts-ignore
              ref={unitFullRef}
              type="text"
              placeholder="bv: 'Tijd'"
              required
            ></input>
            <input
              className="p-2 rounded mt-2"
              // @ts-ignore
              ref={unitShortRef}
              type="text"
              placeholder="bv: 's'"
            ></input>
          </section>
          <section id="sort" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              Sorteermethode
            </label>
            <select
              className="p-2 rounded"
              value={sort}
              onChange={handleDropdown}
            >
              <option value="asc">Laag naar Hoog</option>
              <option value="desc">Hoog naar Laag</option>
            </select>
          </section>
          <section id="private" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              Privé categorie?
            </label>
            <select
              className="p-2 rounded"
              value={sort}
              onChange={handlePrivate}
            >
              <option value="true">Ja</option>
              <option value="false">Nee</option>
            </select>
          </section>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 rounded p-2 font-medium mt-2"
          >
            Toevoegen
          </button>
        </form>
      </div>
    </div>
  );
}
