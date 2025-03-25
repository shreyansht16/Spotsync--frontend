"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { gsap } from "gsap";

const Pagination = ({ section, currentPage, totalPages }) => {
  const paginationRef = useRef(null); // Ref to the pagination container

  useEffect(() => {
    const buttons = paginationRef.current.querySelectorAll("a, span");

    // Apply GSAP animation to all pagination buttons
    buttons.forEach((button) => {
      gsap.set(button, { perspective: 400 });
      gsap.fromTo(
        button,
        {
          scale: 1,
          rotateY: 0,
        },
        {
          scale: 1.1,
          rotateY: 10,
          ease: "power1.inOut",
          duration: 0.3,
          yoyo: true,
          repeat: -1,
          paused: true,
        }
      );

      // GSAP hover animation
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.2,
          rotateY: 10,
          duration: 0.5,
          ease: "power3.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          rotateY: 0,
          duration: 0.5,
          ease: "power3.in",
        });
      });
    });
  }, [currentPage]);

  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-1"
          aria-label="Pagination"
          ref={paginationRef} // Reference for the pagination container
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <TfiAngleLeft />
            </Link>
          ) : (
            <span
              className={`${
                !hasPrevPage && "opacity-0"
              } inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <TfiAngleLeft />
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white"
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  passHref
                  aria-current="page"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md px-4 py-2 font-medium text-primary hover:bg-primary hover:text-body"
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <TfiAngleRight />
            </Link>
          ) : (
            <span
              className={`${
                !hasNextPage && "opacity-0"
              } inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <TfiAngleRight />
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
