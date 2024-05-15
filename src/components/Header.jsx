import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.webp';
import style from './header-style.module.css';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { MyContext } from '../MyContext';
import usFlag from '../assets/images/svgs/us-flag.svg';
import brFlag from '../assets/images/svgs/br-flag.svg';

export default function Header() {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const { language, handleLanguageChange } = useContext(MyContext);

  const handleClick = () => {
    document.body.classList.remove('popup-open');
    setisMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRemoveBodyClass = () => {
    document.body.classList.remove('popup-open');
  };

  return (
    <>
      <header className="w-full fixed top-0 bg-white flex flex-row items-center justify-between z-20 h-[80px] px-[20px] md:px-[75px] pt-[15px]">
        <div className="flex flex-0-auto items-center">
          <NavLink className="" to="/">
            <img alt="Sti7ch logo" className="w-[134px]" src={logo} />
          </NavLink>
        </div>

        <div className="flex relative items-center flex-1 justify-end gap-5">
          <div className=" md:flex gap-[10px] md:absolute right-0 -top-[20px] text-[11px]">
            <span
              className={`flex relative gap-[5px] ${
                language === 'en' ? ' text-blue-one' : ''
              }`}
            >
              <img alt="US Flag" className="w-[20px]" src={usFlag} />
              English
              <input
                type="radio"
                onChange={handleLanguageChange}
                name="language"
                checked={language === 'en'}
                id="en"
                value="en"
                className="absolute z-[2] w-full h-full opacity-0 cursor-pointer top-0 left-0 block"
              />
            </span>
            <span
              className={`flex relative gap-[5px] ${
                language === 'pt' ? ' text-blue-one' : ''
              }`}
            >
              <img alt="BR Flag" className="w-[20px]" src={brFlag} />
              Português
              <input
                type="radio"
                onChange={handleLanguageChange}
                name="language"
                checked={language === 'pt'}
                id="pt"
                value="pt"
                className="absolute z-[2] w-full h-full opacity-0 cursor-pointer top-0 left-0 block"
              />
            </span>
          </div>
          <span
            onClick={handleClick}
            className="text-[50px] cursor-pointer md:hidden"
          >
            {!isMobileMenuOpen ? <IoMenu /> : <IoClose />}
          </span>
          <nav className="flex-0-auto translate-y-3 hidden md:flex">
            <ul
              className={`${style.navigationList} flex flex-row items-center justify-end gap-12`}
            >
              <li className="text-black tracking-[2px] text-[18px] uppercase">
                <NavLink
                  onClick={handleRemoveBodyClass}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/about"
                >
                  {language === 'en' ? `About` : 'Sobre '}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  onClick={handleRemoveBodyClass}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/methodology"
                >
                  {language === 'en' ? `Methodology ` : 'Metodologia  '}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  onClick={handleRemoveBodyClass}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/case-studies"
                >
                  {language === 'en' ? `Case Studies ` : 'Estudo de Casos  '}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  onClick={handleRemoveBodyClass}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/contact"
                >
                  {language === 'en' ? `Contact ` : 'Contato  '}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <nav
        className={`w-[100vw] h-[100dvh] fixed top-0 right-0 bg-blue-one flex flex-col items-start justify-between pb-[35px] md:hidden px-[20px] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[105vw]'
        } transition-all ease-linear duration-500 z-10`}
      >
        <ul
          className={`${style.navigationList} w-full flex flex-col items-start md:px-0 md:items-center justify-start pt-[110px] gap-12`}
        >
          <li className="text-black tracking-[2px] text-[18px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? 'font-modelicabold'
                  : 'font-modelicamed hover:font-bold'
              }
              to="/about"
            >
              {language === 'en' ? `About` : 'Sobre '}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? 'font-modelicabold'
                  : 'font-modelicamed hover:font-bold'
              }
              to="/methodology"
            >
              {language === 'en' ? `Methodology ` : 'Metodologia  '}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? 'font-modelicabold'
                  : 'font-modelicamed hover:font-bold'
              }
              to="/case-studies"
            >
              {language === 'en' ? `Case Studies ` : 'Estudo de Casos  '}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? 'font-modelicabold'
                  : 'font-modelicamed hover:font-bold'
              }
              to="/contact"
            >
              {language === 'en' ? `Contact ` : 'Contato  '}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
