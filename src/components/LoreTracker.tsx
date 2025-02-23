"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LoreTrackerProps {
    player: number;
    lore: number;
    updateLore: (player: number, newLore: number) => void;
    bo: number;
    deckColors: string[];
    onVictory: (player: number) => void;
}

interface HistoryEntry {
    prev: number;
    newLore: number;
    delta: number;
}

export default function LoreTracker({ player, lore, updateLore, bo, deckColors, onVictory }: LoreTrackerProps) {
    const [pendingLoreChange, setPendingLoreChange] = useState<number>(0);
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        if (pendingLoreChange !== 0) {
            const timer = setTimeout(() => {
                setHistory((h) => [...h, { prev: lore - pendingLoreChange, newLore: lore, delta: pendingLoreChange }]);
                setPendingLoreChange(0);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [pendingLoreChange, lore]);

    const handleLoreChange = (amount: number) => {
        const newLore = Math.max(0, Math.min(20, lore + amount));
        if (newLore !== lore) {
            setPendingLoreChange((prevChange) => prevChange + amount);
            updateLore(player, newLore);
        }
        if (newLore === 20) {
            onVictory(player);
        }
    };

    return (
        <Card className="relative p-4 text-center w-80 h-48 flex flex-col justify-between rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${deckColors[0]}, ${deckColors[1]})` }}></div>
          <div className="absolute top-5 left-2 w-14 h-40 overflow-hidden text-left text-sm">
            <div className="h-full overflow-y-auto scrollbar-hidden">
              {history.map((entry, index) => (
                <p key={index} className="line-through opacity-50">
                  {entry.prev} <span className={entry.newLore - entry.prev > 0 ? 'text-green-500' : 'text-red-500'}>({entry.newLore - entry.prev > 0 ? '+' : ''}{entry.newLore - entry.prev})</span>
                </p>
              ))}
              {history.length && <p key={history.length}>{lore}</p>}
            </div>
          </div>
          <div className="flex flex-col flex-grow items-center justify-center">
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(bo)].map((_, i) => (
                <span key={i} className={`w-3 h-3 rounded-full ${i < bo ? 'bg-white' : 'bg-gray-400'}`} />
              ))}
            </div>
            <p className="text-5xl font-bold">{lore}</p>
          </div>
          <Button className="absolute top-0 left-0 w-full h-1/2 bg-transparent" onClick={() => handleLoreChange(1)}></Button>
          <Button className="absolute bottom-0 left-0 w-full h-1/2 bg-transparent" onClick={() => handleLoreChange(-1)}></Button>
          <Button className="absolute top-2 right-2 text-xs p-1" onClick={() => handleLoreChange(1)}>+1</Button>
          <Button className="absolute bottom-2 right-2 text-xs p-1" onClick={() => handleLoreChange(-1)}>-1</Button>
          <p className="text-sm font-bold mt-auto">Joueur {player + 1}</p>
        </Card>
      );
}