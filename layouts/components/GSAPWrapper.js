"use client";

import { gsap } from "@lib/gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAPWrapper = ({ children }) => {
  const main = useRef();
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset animations on navigation or new page load
      gsap.set(".fade, .animate, .bg-theme", { clearProps: "all" });

      // Fade animation
      const fadeElements = document.querySelectorAll(".fade");
      fadeElements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scrollTrigger: el,
          duration: 0.3,
        });
      });

      // GSAP animations for elements
      const elements = document.querySelectorAll(".animate");
      elements.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            // markers: true,
          },
        });

        if (el.classList.contains("from-left")) {
          tl.from(el, {
            opacity: 0,
            x: -100,
          });
        } else if (el.classList.contains("from-right")) {
          tl.from(el, {
            opacity: 0,
            x: 100,
          });
        } else {
          tl.from(el, {
            opacity: 0,
            y: 100,
          });
        }
      });

      // Background animation
      const animatedBgs = document.querySelectorAll(".bg-theme");
      animatedBgs.forEach((bg) => {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            toggleClass: "bg-animate",
            once: true,
          },
        });
      });
    }, main);

    // Clean up GSAP context on unmount or before reinitializing
    return () => ctx.revert();
  }, [pathname]);

  return <main ref={main}>{children}</main>;
};

export default GSAPWrapper;
