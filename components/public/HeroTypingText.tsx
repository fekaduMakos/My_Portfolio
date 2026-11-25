"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "Full-Stack Developer",
  "Creative Graphic Designer",
  "Android App Developer",
  "Software Engineering Student",
  "Creative Technologist"
];

export function HeroTypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 30 : 65;

    // When the whole word is typed out, pause before deleting
    if (!isDeleting && displayedText === currentRole) {
      typingSpeed = 2200; // Pause 2.2s on complete word
    } 
    // When word is fully deleted, move to the next role
    else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      typingSpeed = 300;
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <div className="h-8 sm:h-10 flex items-center">
      <span className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-sky-400 to-emerald-400 bg-clip-text text-transparent font-mono">
        {displayedText}
      </span>
      {/* Animated Terminal Blinking Cursor */}
      <span className="ml-1 inline-block h-5 sm:h-7 md:h-8 w-0.5 sm:w-1 bg-primary animate-pulse" />
    </div>
  );
}
