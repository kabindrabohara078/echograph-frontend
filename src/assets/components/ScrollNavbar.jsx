// import { useEffect, useState } from "react";
// import './edits.css'

// export default function ScrollNavbar() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className={isScrolled ? "navbar scrolled" : "navbar"}>
//         <div className="app-name">
//             <p>EchoGraph</p>
//         </div>
      
//     </div>
//   );
// }