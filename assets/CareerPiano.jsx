import { useState, useRef } from "react";

const CareerPiano = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/assets/audio/wonder.mp3"));

  const careerStages = [
    {
      note: "C",
      year: "2020",
      title: "Career Start",
      description: "Started as Junior Developer",
      color: "bg-blue-500",
      type: "white",
    },
    {
      note: "C#",
      year: "2020",
      title: "First Project",
      description: "Frontend Development",
      color: "bg-indigo-500",
      type: "black",
    },
    {
      note: "D",
      year: "2021",
      title: "Team Growth",
      description: "Led frontend development",
      color: "bg-green-500",
      type: "white",
    },
    {
      note: "D#",
      year: "2021",
      title: "Tech Stack",
      description: "Mastered React",
      color: "bg-teal-500",
      type: "black",
    },
    {
      note: "E",
      year: "2022",
      title: "Team Lead",
      description: "Promoted to team lead",
      color: "bg-purple-500",
      type: "white",
    },
    {
      note: "F",
      year: "2023",
      title: "Tech Manager",
      description: "Managing multiple teams",
      color: "bg-pink-500",
      type: "white",
    },
    {
      note: "F#",
      year: "2023",
      title: "Innovation",
      description: "Led major project",
      color: "bg-red-500",
      type: "black",
    },
    {
      note: "G",
      year: "2024",
      title: "Current Role",
      description: "Senior Tech Lead",
      color: "bg-yellow-500",
      type: "white",
    },
  ];

  const playSound = () => {
    if (!isMuted && !isPlaying) {
      setIsPlaying(true);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const createMagicTrail = (startX, startY) => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: startX + Math.random() * 40 - 20,
      top: startY,
    }));

    return particles;
  };

  const PianoKey = ({ stage, index, type }) => {
    const isBlack = type === "black";
    const leftPosition = isBlack
      ? `${[1, 2, 4, 5, 6][index] * 56}px`
      : `${index * 56}px`;

    return (
      <button
        className={`
          absolute 
          ${
            isBlack ? "h-32 w-8 -ml-4 z-20 bg-black" : "h-48 w-14 z-10 bg-white"
          }
          cursor-pointer rounded-b-md
          transition-all duration-200
          overflow-hidden
          outline-none
          focus:outline-none
          border-l border-r border-b border-gray-300
          hover:bg-opacity-90
        `}
        style={{
          left: leftPosition,
          transformOrigin: "top",
        }}
        onClick={() => {
          setActiveStage(stage);
          playSound();
          createMagicTrail(parseInt(leftPosition), 0);
        }}
      />
    );
  };

  return (
    <section className="career section">
      <h2 className="section__subtitle">Career Progression</h2>
      <h3 className="section__title">
        My <span>Path</span>
      </h3>

      <div className="max-w-6xl mx-auto p-8 relative">
        {/* Sound Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors z-30"
        >
          {isMuted ? (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 3l-12 12M11 5L6 9H2v6h4l5 4M14 9.5c.5.7.8 1.6.8 2.5s-.3 1.8-.8 2.5M17 7c1.2 1.3 2 3.1 2 5s-.8 3.7-2 5" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Piano Container */}
        <div className="relative w-[640px] h-64 mx-auto">
          {/* Base Shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2 bg-black/20 blur-md rounded-full" />

          {/* Piano Keys Container */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[584px]">
            {/* White Keys */}
            {careerStages
              .filter((stage) => !stage.note.includes("#"))
              .map((stage, index) => (
                <PianoKey
                  key={stage.note}
                  stage={stage}
                  index={index}
                  type="white"
                />
              ))}

            {/* Black Keys */}
            {careerStages
              .filter((stage) => stage.note.includes("#"))
              .map((stage, index) => (
                <PianoKey
                  key={stage.note}
                  stage={stage}
                  index={index}
                  type="black"
                />
              ))}
          </div>
        </div>

        {/* Journey Cards Container */}
        <div className="relative w-full h-64 mt-16">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200" />

          {careerStages.map((stage, index) => (
            <div
              key={stage.note}
              className={`absolute top-4 ${stage.color} rounded-lg p-4 shadow-xl w-48 transition-all duration-500`}
              style={{
                left: `${index * 12.5}%`,
                transform: `translateX(-50%) translateY(${
                  activeStage?.note === stage.note ? 0 : 20
                }px)`,
                opacity: activeStage?.note === stage.note ? 1 : 0,
              }}
            >
              <div className="text-white relative z-10">
                <div className="font-bold">{stage.year}</div>
                <div className="text-lg font-semibold">{stage.title}</div>
                <div className="text-sm">{stage.description}</div>
              </div>

              {activeStage?.note === stage.note && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-200/30 to-yellow-200/0 animate-shine" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPiano;
