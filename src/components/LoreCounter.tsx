"use client"

import { useState } from "react";
import LoreTracker from "./LoreTracker";

export default function LoreCounter() {
  // amber, amethyst, emerald, ruby, sapphire, steel
  const colors = ["#FFBF00", "#9966CC", "#50C878", "#E0115F", "#0F52BA", "#8A8A8A"];
  const [lore, setLore] = useState<number[]>([0, 0]);
  const [bo, setBo] = useState<number[]>([0, 0]);
  const [deckColors] = useState<string[][]>([
    [colors[0], colors[1]],
    [colors[2], colors[3]]
  ]);

  const updateLore = (player: number, newLore: number) => {
    setLore((prev) => {
      const newLores = [...prev];
      newLores[player] = newLore;
      return newLores;
    });
  };

  const handleVictory = (player: number) => {
    setBo((prev) => {
      const newBo = [...prev];
      newBo[player] += 1;
      return newBo;
    });
    setLore([0, 0]);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <LoreTracker player={0} lore={lore[0]} updateLore={updateLore} bo={bo[0]} deckColors={deckColors[0]} onVictory={handleVictory} />
      <LoreTracker player={1} lore={lore[1]} updateLore={updateLore} bo={bo[1]} deckColors={deckColors[1]} onVictory={handleVictory} />
    </div>
  );
}
