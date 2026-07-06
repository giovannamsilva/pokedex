import { NextRequest, NextResponse } from "next/server";

interface ChatRequestBody {
  question: string;
  pokemonName: string;
  pokemonTypes: string[];
  pokemonStats: { name: string; value: number }[];
}

export async function POST(request: NextRequest) {
  const body: ChatRequestBody = await request.json();
  const { question, pokemonName, pokemonTypes, pokemonStats } = body;

  const statsText = pokemonStats
    .map((s) => s.name + ": " + s.value)
    .join(", ");

  const systemPrompt =
    "Você é um especialista em Pokémon, ajudando um treinador. " +
    "Responda de forma clara, direta e amigável, em português. " +
    "Use apenas as informações fornecidas sobre o Pokémon abaixo, " +
    "e seu conhecimento geral sobre o universo Pokémon, para responder.\n\n" +
    "Pokémon: " + pokemonName + "\n" +
    "Tipo(s): " + pokemonTypes.join(", ") + "\n" +
    "Status base: " + statsText;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    }
  );

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content ?? "Não foi possível obter uma resposta.";

  return NextResponse.json({ answer });
}