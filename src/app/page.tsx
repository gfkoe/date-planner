"use client";
import React from "react";

import { useEffect, useState } from "react";
import { Dino } from "./types.ts";
import Link from "next/link";

export default function Home() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/dinosaurs");
      const allDinosaurs = (await response.json()) as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  return (
    <main>
      <h1>Dinosaur App</h1>
      <p>Click dinosaur below</p>
      <ul>
        {dinosaurs.map((dinosaur: Dino) => {
          return (
            <li key={dinosaur.name}>
              <Link href={`/${dinosaur.name.toLowerCase()}`}>
                {dinosaur.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
