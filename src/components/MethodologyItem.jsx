import React, { useRef, useEffect } from "react";
import style from "./methodologyitem-style.module.css";
import { Link } from "react-router-dom";

export default function MethodologyItem({ item }) {
  return (
    <li
      key={item.id}
      className={`${style.metListItem} w-full md:w-[14%] grow-0 group flex-0-auto relative flex flex-col justify-center animate__animated animate__fadeIn`}
    >
      <Link
        to={item.slug}
        className={`flex flex-col justify-start relative items-center`}
      >
        <div className="flex w-full relative h-[150px] justify-center items-end">
          {item.imageUrl && (
            <>
              <span
                className={`${style.svgContainer} absolute scale-100 group-hover:scale-125 transition-all ease duration-500 mb-3 w-full justify-center flex max-h-[150px]`}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title.rendered}
                    className="w-full h-full"
                  />
                )}
              </span>
            </>
          )}
        </div>
        <h3 className="text-[20px] font-modelicabold text-center mb-5">
          {item.title.rendered}
        </h3>
      </Link>
    </li>
  );
}
