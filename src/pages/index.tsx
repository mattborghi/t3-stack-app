import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useEffect, useState } from "react";

const ButtonClasses =
  "border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline";

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

  if (
    firstPokemon.isLoading ||
    secondPokemon.isLoading ||
    !firstPokemon.data?.sprites.front_default ||
    !secondPokemon.data?.sprites.front_default
  )
    return null;

  const voteForRoundest = (selection: number | undefined) => {
    if (!selection) return null;
    console.log("voting for " + selection);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-evenly items-center max-w-2xl">
        <div className="flex flex-col items-center">
          <Image
            alt={firstPokemon.data?.name ?? ""}
            src={firstPokemon.data?.sprites.front_default ?? ""}
            width="240"
            height="240"
            priority
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">
            {firstPokemon.data?.name}
          </div>
          <button
            className={ButtonClasses}
            onClick={() => voteForRoundest(initialValues?.first)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="flex flex-col items-center">
          <Image
            alt={secondPokemon.data?.name ?? ""}
            src={secondPokemon.data?.sprites.front_default}
            width="240"
            height="240"
            priority
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">
            {secondPokemon.data?.name}
          </div>
          <button
            className={ButtonClasses}
            onClick={() => voteForRoundest(initialValues?.second)}
          >
            Rounder
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}
