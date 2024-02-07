import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.webp';
import style from './header-style.module.css';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

  const handleClick = () => {
    setisMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="w-full fixed top-0 bg-white flex flex-row items-center justify-between z-20 h-[80px] px-[20px] md:px-[75px] pt-[15px]">
        <div className="flex flex-0-auto items-center">
          <NavLink className="" to="/">
            <img alt="Sti7ch logo" className="w-[134px]" src={logo} />
          </NavLink>
        </div>

        <div className="flex items-center flex-1 justify-end gap-5">
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
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/methodology"
                >
                  Methodology
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/case-studies"
                >
                  Case Studies
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'font-modelicabold'
                      : 'font-modelicamed hover:font-bold'
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <nav
        className={`w-[100vw] h-[100vh] fixed top-0 right-0 bg-white flex md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[105vw]'
        } transition-all ease-linear duration-500 z-10`}
      >
        <ul
          className={`${style.navigationList} w-full flex flex-col items-start px-[20px] md:px-0 md:items-center justify-around py-[20vh] gap-12`}
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
              About
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
              Methodology
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
              Case Studies
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
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
