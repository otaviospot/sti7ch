import React from "react";

export const PageMainContent = ({ title, content, style }) => {
  return (
    <>
      <h1 className="text-[40px] leading-[42px] md:leading-[7vw] md:text-[5vw] font-modelicabold text-left animate__animated animate__fadeInLeft">
        {title}
      </h1>
      <div className={style}>
        <div
          className="text-content animate__animated animate__fadeInLeft animate__delay-2s"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>
    </>
  );
};
