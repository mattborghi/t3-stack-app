import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

type Pair = {
  first: number;
  second: number;
};

export default function Home() {
  const [initialValues, setInitialValues] = useState<Pair>();

  useEffect(() => {
    const [first, second] = getOptionsForVote();
    setInitialValues({ first, second });
  }, []);

  const firstPokemon = trpc.getPokemonById.useQuery({
    id: initialValues?.first ?? 0,
  });
  const secondPokemon = trpc.getPokemonById.useQuery({
    id: initialValues?.second ?? 0,
  });

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-evenly items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <img
            alt={firstPokemon.data?.name}
            src={firstPokemon.data?.sprites.front_default ?? ""}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img
            alt={secondPokemon.data?.name}
            src={secondPokemon.data?.sprites.front_default ?? ""}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">{secondPokemon.data?.name}</div>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}
