import { useState } from 'react';
import arrowDown from '../assets/images/arrowdown.svg';
import style from './singlecase-style.module.css';
import { MdClose } from 'react-icons/md';

export default function SingleCase({ singlecase }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpOpen = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  return (
    <div
      className={` ${style.caseItem} flex flex-col mt-8 w-1/3 items-center text-left`}
    >
      <h3
        className={`${
          isPopUpOpen ? 'opacity-0 ' : 'opacity-100'
        } font-modelicalight text-[2vw] transition-opacity ease-in-out`}
      >
        {singlecase.title && singlecase.title.rendered}
      </h3>
      <button
        onClick={handlePopUpOpen}
        className={`mt-[30px] z-[5] transition-opacity ease-in-out ${
          isPopUpOpen ? 'opacity-0 ' : 'opacity-100'
        }`}
      >
        <img alt="See more" className="w-[20px]" src={arrowDown} />
      </button>
      <div
        className={`${
          style.popUpSingleCase
        } absolute -translate-y-[20px] py-10 px-10 rounded-xl transition-all ease-in-out ${
          isPopUpOpen ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-0'
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
          className={`${style.contentPopUp} block text-left flex flex-col gap-[15px]`}
          dangerouslySetInnerHTML={{
            __html: singlecase.content && singlecase.content.rendered,
          }}
        ></div>
      </div>
    </div>
  );
}
