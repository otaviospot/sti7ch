import React from 'react';

export const PageMainContent = ({ title, content, style }) => {
  return (
    <>
      <h1 className="text-[40px] md:text-[5vw] 2xl:text-[5vw] leading-[42px] 2xl:leading-[7vw] md:leading-[7vw] font-modelicabold text-left animate__animated animate__fadeInLeft">
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
