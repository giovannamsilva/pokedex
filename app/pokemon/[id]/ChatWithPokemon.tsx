"use client";

import { useState } from "react";

interface ChatWithPokemonProps {
  pokemonName: string;
  pokemonTypes: string[];
  pokemonStats: { name: string; value: number }[];
}

export default function ChatWithPokemon({
  pokemonName,
  pokemonTypes,
  pokemonStats,
}: ChatWithPokemonProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (question.trim() === "") return;

    setLoading(true);
    setAnswer("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        pokemonName: pokemonName,
        pokemonTypes: pokemonTypes,
        pokemonStats: pokemonStats,
      }),
    });

    const data = await response.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="font-bold text-gray-700 mb-2">
        Pergunte sobre {pokemonName}
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: quais as fraquezas dele?"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
        >
          {loading ? "Pensando..." : "Perguntar"}
        </button>
      </div>

      {answer && (
        <div className="mt-4 bg-gray-50 border rounded p-3 text-sm text-gray-700 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}