import Link from "next/link";
import ChatWithPokemon from "./ChatWithPokemon";
import { getTypeColor } from "../../lib/typeColors";

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

  const mainColor = getTypeColor(typeNames[0]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12">
      <div className="max-w-xl mx-auto px-4">
        <Link
          href="/"
          className="inline-block text-white/90 hover:text-white text-sm mt-4 mb-2"
        >
          &larr; Voltar para a lista
        </Link>

        <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
          {/* Banner colorido de acordo com o tipo principal, já com a imagem dentro */}
          <div
            className="relative flex flex-col items-center pt-8 pb-6"
            style={{
              background: "linear-gradient(135deg, " + mainColor + "cc, " + mainColor + "66)",
            }}
          >
            <img
              src={getImageUrl(pokemon.id)}
              alt={pokemon.name}
              className="w-40 h-40 object-contain drop-shadow-lg"
            />

            <p className="text-white/80 text-sm font-semibold tracking-wide mt-1">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
            <h1 className="text-3xl font-extrabold capitalize text-white drop-shadow-sm">
              {pokemon.name}
            </h1>

            <div className="flex gap-2 mt-3">
              {typeNames.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div className="bg-gray-50 rounded-xl py-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Altura
                </p>
                <p className="font-bold text-gray-700">
                  {pokemon.height / 10} m
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl py-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Peso
                </p>
                <p className="font-bold text-gray-700">
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-bold text-gray-700 mb-3">Status base</h2>
              <div className="space-y-2">
                {statsFormatted.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs text-gray-500 capitalize mb-1">
                      <span>{s.name.replace("-", " ")}</span>
                      <span className="font-semibold">{s.value}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: Math.min((s.value / 255) * 100, 100) + "%",
                          backgroundColor: mainColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ChatWithPokemon
              pokemonName={pokemon.name}
              pokemonTypes={typeNames}
              pokemonStats={statsFormatted}
            />
          </div>
        </div>
      </div>
    </main>
  );
}