// import HTMLFlipBook from "react-pageflip";
// import page1 from "./assets/Page1.jpeg";
// import page2 from "./assets/Page2.jpeg";
// import page3 from "./assets/Page3.jpeg";
// import page4 from "./assets/Page4.jpeg";

// export default function AboutBook() {
//   return (
//     <section className="w-full py-20 bg-gray-100 flex flex-col items-center">

//       {/* TITLE SECTION */}
//       <div className="text-center mb-10 px-4">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-800">
//           Our Vision
//         </h1>
//         <p className="text-gray-500 mt-2">
//           A glimpse into our company’s direction and purpose
//         </p>
//       </div>

//       {/* BOOK */}
//       <div className="w-full flex justify-center">

//         {/* DESKTOP BOOK VIEW */}
//         <div className="hidden md:block">
//           <HTMLFlipBook
//             width={580}
//             height={700}
//             showCover={true}
//             className="shadow-2xl"
//           >

//             <div className="w-full h-full bg-white">
//               <img
//                 src={page1}
//                 alt="Page 1"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>

//             <div className="w-full h-full bg-white">
//               <img
//                 src={page2}
//                 alt="Page 2"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>

//             <div className="w-full h-full bg-white">
//               <img
//                 src={page3}
//                 alt="Page 3"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>

//             <div className="w-full h-full bg-white">
//               <img
//                 src={page4}
//                 alt="Page 4"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>

//           </HTMLFlipBook>
//         </div>

//         {/* MOBILE VIEW (IMPORTANT) */}
//         <div className="md:hidden w-full px-4 space-y-6">
//           <img src={page1} alt="Page 1" className="w-full rounded-xl shadow-lg" />
//           <img src={page2} alt="Page 2" className="w-full rounded-xl shadow-lg" />
//           <img src={page3} alt="Page 3" className="w-full rounded-xl shadow-lg" />
//           <img src={page4} alt="Page 4" className="w-full rounded-xl shadow-lg" />
//         </div>

//       </div>

//     </section>
//   );
// }

import HTMLFlipBook from "react-pageflip";
import { useRef, useState } from "react";
import page1 from "./assets/Page1.jpeg";
import page2 from "./assets/Page2.jpeg";
import page3 from "./assets/Page3.jpeg";
import page4 from "./assets/Page4.jpeg";

export default function AboutBook() {
  const bookRef = useRef();
  const [page, setPage] = useState(0);

  const pages = [page1, page2, page3, page4];

  return (
    <section className="w-full py-20 bg-gray-100 flex flex-col items-center">

      {/* TITLE */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-800">
          Our Vision
        </h1>
        <p className="text-gray-500 mt-2">
          A glimpse into our company’s direction and purpose
        </p>
      </div>

      {/* BOOK */}
      <div className="w-full flex justify-center relative">

        {/* LEFT ARROW */}
        <button
          onClick={() => bookRef.current.pageFlip().flipPrev()}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 items-center justify-center"
        >
          ←
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => bookRef.current.pageFlip().flipNext()}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 items-center justify-center"
        >
          →
        </button>

        {/* BOOK */}
        <div>
          <HTMLFlipBook
            width={580}
            height={700}
            showCover={true}
            ref={bookRef}
            onFlip={(e) => setPage(e.data)}   // 🔥 track current page
            className="shadow-2xl"
          >
            {pages.map((img, index) => (
              <div key={index} className="w-full h-full bg-white">
                <img
                  src={img}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* MOBILE */}
        <div className="md:hidden w-full px-4 space-y-6">
          {pages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Page ${index + 1}`}
              className="w-full rounded-xl shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="hidden md:flex gap-3 mt-6">
        {pages.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              page === index
                ? "bg-gray-800 scale-125"
                : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* HINT */}
      <p className="hidden md:block text-sm text-gray-500 mt-2">
        Use arrows or swipe to flip pages
      </p>

    </section>
  );
}
