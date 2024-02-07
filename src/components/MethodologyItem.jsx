import React, { useRef, useEffect } from 'react';
import style from './methodologyitem-style.module.css';
import { Link } from 'react-router-dom';

import { ReactComponent as SvgComponent1 } from '../assets/images/svgs/met-1-animated.svg';
import { ReactComponent as SvgComponent2 } from '../assets/images/svgs/met-2-animated.svg';
import { ReactComponent as SvgComponent3 } from '../assets/images/svgs/met-3-animated.svg';
import { ReactComponent as SvgComponent4 } from '../assets/images/svgs/met-4-animated.svg';
import { ReactComponent as SvgComponent5 } from '../assets/images/svgs/met-5-animated.svg';
import { ReactComponent as SvgComponent6 } from '../assets/images/svgs/met-6-animated.svg';
import { ReactComponent as SvgComponent7 } from '../assets/images/svgs/met-7-animated.svg';

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
      className={`${style.metListItem} w-full md:w-[14%] grow-0 group flex-0-auto relative flex flex-col justify-center`}
    >
      <Link
        to={item.slug}
        className={`flex flex-col justify-start relative items-center`}
      >
        <div className="flex w-full relative h-[150px] justify-center items-end">
          {item.imageUrl && (
            <>
              <span
                className={`${style.svgContainer} absolute scale-0 group-hover:scale-125 transition-all ease duration-500 mb-3 w-full justify-center flex max-h-[150px]`}
              >
                {item.title &&
                svgMapping[Number(item.title.rendered.substr(0, 1))]
                  ? React.createElement(
                      svgMapping[Number(item.title.rendered.substr(0, 1))]
                    )
                  : null}
              </span>

              <img
                className={`mb-3 w-full justify-center flex max-h-[150px] scale-90 group-hover:scale-50 transition-all linear delay-100 duration-200`}
                alt={item.title && item.title.rendered}
                src={item.imageUrl}
              />
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
