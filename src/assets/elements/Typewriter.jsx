import { useEffect, useState } from "react";


export default function Typewriter() {

  const text = "INTELLIGENT applications.";
  const [displayed, setDisplayed] = useState("");


  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) clearInterval(interval);

    }, 100); // speed (lower = faster)

    return () => clearInterval(interval);
  }, []);

  return displayed;
}