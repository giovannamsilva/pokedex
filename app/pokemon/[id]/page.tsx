import Link from "next/link";
import ChatWithPokemon from "./ChatWithPokemon";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
}

async function getPokemonDetail(id: string): Promise<PokemonDetail> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const data: PokemonDetail = await response.json();
  return data;
}

function getImageUrl(id: number): string {
  return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  const typeNames = pokemon.types.map((t) => t.type.name);
  const statsFormatted = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link href="/" className="text-blue-600 hover:underline">
        &larr; Voltar para a lista
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mt-4 max-w-xl mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={getImageUrl(pokemon.id)}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />
          <h1 className="text-2xl font-bold capitalize mt-2 text-gray-800">
            {pokemon.name}
          </h1>
          <p className="text-gray-400">#{pokemon.id}</p>

          <div className="flex gap-2 mt-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <p>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-gray-700 mb-2">Status base</h2>
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="mb-1">
              <span className="capitalize text-sm text-gray-600">
                {s.stat.name}: {s.base_stat}
              </span>
            </div>
          ))}
        </div>

        <ChatWithPokemon
          pokemonName={pokemon.name}
          pokemonTypes={typeNames}
          pokemonStats={statsFormatted}
        />
      </div>
    </main>
  );
}