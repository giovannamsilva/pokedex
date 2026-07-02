import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-sm">
        <svg
          width="72"
          height="72"
          viewBox="0 0 100 100"
          className="mx-auto mb-4 opacity-60"
        >
          <circle cx="50" cy="50" r="46" fill="#ccc" />
          <path d="M4 50 A46 46 0 0 1 96 50 Z" fill="#ccc" />
          <path d="M4 50 A46 46 0 0 0 96 50 Z" fill="white" />
          <rect x="4" y="46" width="92" height="8" fill="#888" />
          <circle cx="50" cy="50" r="14" fill="white" stroke="#888" strokeWidth="6" />
        </svg>

        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Pokémon não encontrado
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Não conseguimos encontrar esse Pokémon. Verifique o nome ou número
          e tente novamente.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-red-700 transition-colors"
        >
          Voltar para a busca
        </Link>
      </div>
    </main>
  );
}