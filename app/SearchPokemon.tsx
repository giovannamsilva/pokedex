"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPokemon() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    const cleaned = query.trim().toLowerCase();
    if (cleaned === "") return;
    router.push("/pokemon/" + cleaned);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex flex-col items-center text-center mb-10">
      {/* Ícone de pokébola em SVG puro */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 100 100"
        className="mb-3 drop-shadow-md"
      >
        <circle cx="50" cy="50" r="46" fill="#EE1515" />
        <path d="M4 50 A46 46 0 0 1 96 50 Z" fill="#EE1515" />
        <path d="M4 50 A46 46 0 0 0 96 50 Z" fill="white" />
        <rect x="4" y="46" width="92" height="8" fill="#222" />
        <circle cx="50" cy="50" r="14" fill="white" stroke="#222" strokeWidth="6" />
        <circle cx="50" cy="50" r="6" fill="#EEE" />
      </svg>

      <h1 className="text-3xl font-extrabold text-gray-800">
        Pokedex Inteligente
      </h1>
      <p className="text-gray-500 mt-1 mb-5">
        Explore Pokémon e tire suas dúvidas com uma IA treinadora
      </p>

      <div className="flex w-full max-w-md shadow-lg rounded-full overflow-hidden border border-gray-200">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por nome ou número (ex: pikachu, 45)"
          className="flex-1 px-5 py-3 text-sm outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold px-6 hover:from-red-700 hover:to-red-600 transition-colors"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}