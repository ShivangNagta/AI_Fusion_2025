import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollText() {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word");

      gsap.set(words, { opacity: 0.1 });

      gsap.to(words, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.02,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }
  }, []);

  const text = "At SolEdge, we are dedicated to making sustainable solar energy accessible and efficient. With cutting-edge technology and eco-friendly solutions, we help you harness the power of the sun, reducing your carbon footprint and paving the way for a cleaner, greener future.";

  return (
    <div id="smooth-content" className="relative w-3/5">
      <div
        ref={textRef}
        className="text-2xl md:text-5xl lg:text-6xl text-white w-full font-bold cursor-default"
      >
        {text.split(" ").map((word, index) => (
          <span key={index} className="word inline-block">
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}