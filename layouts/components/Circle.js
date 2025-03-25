"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Circle({ className, width, height, fill = true, ...props }) {
  const circleRef = useRef(null);

  useEffect(() => {
    const element = circleRef.current;

    // GSAP animation for dynamic size, 3D effects, and bounce
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.5,
        width: 0,
        height: 0,
        rotation: 360,
        x: -100, // Starting point (coming from the left)
        y: -100, // Starting point (coming from the top)
      },
      {
        opacity: 1,
        scale: 1,
        width: `${width}px`,
        height: `${height}px`,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)", // Adds bounce effect
        delay: 0.2,
      }
    );

    // Pulsing effect after initial entrance
    gsap.to(element, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
      delay: 2, // Start after entrance animation finishes
    });
  }, [width, height]);

  return (
    <div
      ref={circleRef}
      className={`absolute ${className} ${
        fill ? "bg-primary" : "bg-[#ffe6db]"
      } rounded-full`}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...props}
    ></div>
  );
}

export default Circle;
