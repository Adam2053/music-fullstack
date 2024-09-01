"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStart, setCurrentStart] = useState(0);
  const filename = 'audio2.mp3'; // Replace with dynamic filename if needed

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/audio/${filename}`);

        if (!response.ok) {
          throw new Error("Failed to fetch audio file");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.load(); // Load the new source
          audioRef.current.play(); // Start playing
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudio();
  }, [filename]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Audio Streaming Example</h1>
        <audio ref={audioRef} controls>
          Your browser does not support the audio element.
        </audio>
      </div>
    </main>
  );
}
