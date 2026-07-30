import React from 'react';

export default function Marquee() {
  const items = [
    "React.js", "Python", "Java", "Flask", "FastAPI",
    "PostgreSQL", "MySQL", "OpenCV", "Machine Learning",
    "Tailwind CSS", "Git", "GitHub", "Vite", "REST APIs", "Figma"
  ];
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-5 border-y border-white/10 my-12">
      <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {doubled.map((item, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="font-sans text-sm sm:text-base font-semibold tracking-widest text-gray-400 uppercase">{item}</span>
            <span className="ml-6 text-brand-orange font-black select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
