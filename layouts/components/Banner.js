"use client";

import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Banner = ({ title }) => {
  const banner = useRef(null);

  useEffect(() => {
    const bannerElement = banner.current;

    // Animation for banner elements on initial load
    gsap.fromTo(
      ".banner-regular-title",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    gsap.fromTo(
      ".breadcrumb",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
    );

    // Scroll-triggered animation for circles
    gsap.fromTo(
      ".banner-single .circle",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: bannerElement,
          start: "top bottom", // Animation starts when the top of the banner is at the bottom of the viewport
          end: "bottom top", // Animation ends when the bottom of the banner is at the top of the viewport
          scrub: true, // Smoothly animates as you scroll
          toggleActions: "play none none none", // Plays the animation when entering
        },
      }
    );

    // Parallax effect for circles
    const header = document.querySelector(".header");
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerElement,
        start: () => `top ${header.clientHeight}`,
        end: () => `+=${bannerElement.offsetHeight}`,
        scrub: true,
      },
    });

    const position = bannerElement.offsetHeight * 0.15;
    parallaxTl.fromTo(
      ".banner-single .circle",
      { y: 0 },
      { y: position, ease: "none" },
      "<"
    );
  }, []);

  return (
    <div className="banner banner-single" ref={banner}>
      <div className="container-xl">
        <div className="banner-wrapper relative text-center">
          {markdownify(title, "h1", "mb-8 banner-regular-title opacity-0")}
          <ul className="breadcrumb flex items-center justify-center opacity-0">
            <li>
              <Link className="text-primary" href="/">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="capitalize">{title}</li>
          </ul>
          <div className="bg-theme banner-bg col-12 absolute left-0 top-0 bg-theme-light before:hidden after:hidden">
            <ImageFallback
              priority={true}
              fill={true}
              src="/images/vectors/single-banner-wave-1.svg"
              sizes="100vw"
              alt=""
            />
            <ImageFallback
              priority={true}
              fill={true}
              src="/images/vectors/single-banner-wave-2.svg"
              sizes="100vw"
              alt=""
            />
            <Circle
              className="circle left-[15%] top-[18%]"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="circle bottom-[27%] left-[4%]"
              width={73}
              height={73}
            />
            <Circle
              className="circle bottom-[27%] left-[39.5%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[24%] left-[22%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="circle left-[31%] top-[10%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className="circle right-[27%] top-[15%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="circle bottom-[17%] right-[3%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="circle bottom-[50%] right-[38%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="circle right-[13%] top-[30%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[29%] right-[20%]"
              width={65}
              height={65}
            />
            <Circle
              className="circle bottom-[12%] right-[35%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
