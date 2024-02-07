import React from 'react';

export const PageMainContent = ({ title, content, style }) => {
  return (
    <>
      <h1 className="text-[15vw] leading-[15vw] md:leading-[7vw] md:text-[5vw] font-modelicabold text-left">
        {title}
      </h1>
      <div className={style}>
        <div
          className="text-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>
    </>
  );
};
