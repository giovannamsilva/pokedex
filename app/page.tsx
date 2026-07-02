import SearchPokemon from "./SearchPokemon";
import Link from "next/link";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

async function getPokemonList(): Promise<PokemonListItem[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data: PokemonListResponse = await response.json();
  return data.results;
}

function getIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function getImageUrl(id: string): string {
  return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
}

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 via-gray-50 to-blue-50 p-8">
      <SearchPokemon />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonList.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          const imageUrl = getImageUrl(id);
          const detailUrl = "/pokemon/" + id;

          return (
            <Link
              key={pokemon.name}
              href={detailUrl}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="w-24 h-24 object-contain"
              />
              <p className="mt-2 capitalize font-medium text-gray-700">
                {pokemon.name}
              </p>
              <p className="text-sm text-gray-400">#{id}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}