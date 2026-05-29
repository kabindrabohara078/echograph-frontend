import { useEffect, useState } from "react";
import './elements.css'


export default function Typewriter({show_text}) {

  const text = show_text;
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

  return (
    <div style={{
      height:'70px',
      width:'100%',
      textAlign:'left'
    }} className="Typewriter">
      {displayed}
    </div>
  );
}