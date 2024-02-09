import React, { useRef, useEffect } from 'react';
import style from './methodologyitem-style.module.css';
import { Link } from 'react-router-dom';

import { ReactComponent as SvgComponent1 } from '../assets/images/svgs/met-1-animated-2.svg';
import { ReactComponent as SvgComponent2 } from '../assets/images/svgs/met-2-animated-2.svg';
import { ReactComponent as SvgComponent3 } from '../assets/images/svgs/met-3-animated-2.svg';
import { ReactComponent as SvgComponent4 } from '../assets/images/svgs/met-4-animated-2.svg';
import { ReactComponent as SvgComponent5 } from '../assets/images/svgs/met-5-animated-2.svg';
import { ReactComponent as SvgComponent6 } from '../assets/images/svgs/met-6-animated-2.svg';
import { ReactComponent as SvgComponent7 } from '../assets/images/svgs/met-7-animated-2.svg';

const svgMapping = {
  1: SvgComponent1,
  2: SvgComponent2,
  3: SvgComponent3,
  4: SvgComponent4,
  5: SvgComponent5,
  6: SvgComponent6,
  7: SvgComponent7,
};

export default function MethodologyItem({ item }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const animation = svgElement.querySelector('animate');
      if (animation) {
        const startAnimation = () => {
          animation.beginElement();
        };
        const pauseAnimation = () => {
          animation.setAttribute('begin', 'indefinite');
        };

        // Atribuir event listeners ao elemento <li> via ref
        const liElement = svgElement.closest('li');
        if (liElement) {
          liElement.addEventListener('mouseover', startAnimation);
          liElement.addEventListener('mouseout', pauseAnimation);

          return () => {
            liElement.removeEventListener('mouseover', startAnimation);
            liElement.removeEventListener('mouseout', pauseAnimation);
          };
        }
      }
    }
  }, []);

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
