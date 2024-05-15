import style from './methodologyitem-style.module.css';
import { Link } from 'react-router-dom';

export default function MethodologyItem({ item }) {
  return (
    <Link
      to={item.slug}
      className={`w-full flex flex-col justify-start relative items-center md:px-[10px] 2xl:px-0`}
    >
      <div className="flex w-full relative h-[150px] justify-center items-end">
        {item.imageUrl && (
          <>
            <span
              className={`${style.svgContainer} absolute md:scale-90 md:group-hover:scale-100 2xl:scale-100 2xl:group-hover:scale-125 transition-all ease duration-500 mb-3 w-full justify-center flex max-h-[150px]`}
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
  );
}
