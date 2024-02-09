import { useState, useEffect } from 'react';
import arrowDown from '../assets/images/arrowdown.svg';
import style from './singlecase-style.module.css';
import { MdClose } from 'react-icons/md';

export default function SingleCase({
  singlecase,
  openPopupId,
  setOpenPopupId,
}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpOpen = () => {
    setIsPopUpOpen(!isPopUpOpen);
    setOpenPopupId(isPopUpOpen ? null : singlecase.id);
  };

  useEffect(() => {
    if (openPopupId !== singlecase.id && isPopUpOpen) {
      setIsPopUpOpen(false);
    }
  }, [openPopupId]);

  return (
    <div
      className={` ${style.caseItem} flex flex-col mt-[50px] md:mt-8 w-full md:w-1/3 items-center text-left`}
    >
      <h3
        className={`${
          isPopUpOpen ? 'opacity-0 ' : 'opacity-100'
        } font-modelicalight text-center md:text-left text-[20px] md:text-[2vw] transition-opacity ease-in-out`}
      >
        {singlecase.title && singlecase.title.rendered}
      </h3>
      <button
        onClick={handlePopUpOpen}
        className={`mt-[10px] md:mt-[30px] z-[5] transition-opacity ease-in-out ${
          isPopUpOpen ? 'opacity-0 ' : 'opacity-100'
        }`}
      >
        <img alt="See more" className="w-[20px]" src={arrowDown} />
      </button>
      <div
        className={`${
          style.popUpSingleCase
        } fixed overflow-y-auto md:absolute md:-translate-y-[20px] h-100v-h bottom-0 md:bottom-auto md:h-auto py-10 w-full md:w-[120%] px-10 rounded-xl transition-all duration-500 ease-in-out ${
          isPopUpOpen
            ? 'opacity-100 z-10 -translate-y-[0px] md:-translate-y-[20px] md:scale-100'
            : 'opacity-0 z-0 translate-y-[100vh] md:-translate-y-[-20px] md:scale-0'
        }`}
      >
        <button
          className="absolute right-[10px] top-[10px] text-[20px]"
          onClick={handlePopUpOpen}
        >
          <MdClose />
        </button>
        <span className="font-modelicabold block text-[20px] mb-[15px]">
          {singlecase.title && singlecase.title.rendered}
        </span>
        <div
          className={`${style.contentPopUp} text-left flex flex-col gap-[15px]`}
          dangerouslySetInnerHTML={{
            __html: singlecase.content && singlecase.content.rendered,
          }}
        ></div>
      </div>
    </div>
  );
}
