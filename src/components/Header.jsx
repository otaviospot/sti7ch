import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import style from "./header-style.module.css";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { MyContext } from "../MyContext";

export default function Header() {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const { language, handleLanguageChange } = useContext(MyContext);

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

        <div className="flex relative items-center flex-1 justify-end gap-5">
          <div className="hidden md:block absolute right-0 -top-[20px] text-[11px]">
            <div className="relative">
              <select
                className="border-none appearance-none outline-none text-left md:text-right w-[100px] bg-transparent pr-[15px]"
                onChange={handleLanguageChange}
                value={language}
              >
                <option value="en">english</option>
                <option value="pt">português</option>
              </select>
              <svg
                className="absolute right-0 top-0 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
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
                  className={({ isActive }) =>
                    isActive
                      ? "font-modelicabold"
                      : "font-modelicamed hover:font-bold"
                  }
                  to="/about"
                >
                  {language === "en" ? `About` : "Sobre "}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-modelicabold"
                      : "font-modelicamed hover:font-bold"
                  }
                  to="/methodology"
                >
                  {language === "en" ? `Methodology ` : "Metodologia  "}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-modelicabold"
                      : "font-modelicamed hover:font-bold"
                  }
                  to="/case-studies"
                >
                  {language === "en" ? `Case Studies ` : "Estudo de Casos  "}
                </NavLink>
              </li>
              <li className="text-black text-[18px] tracking-[2px] uppercase">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-modelicabold"
                      : "font-modelicamed hover:font-bold"
                  }
                  to="/contact"
                >
                  {language === "en" ? `Contact ` : "Contato  "}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <nav
        className={`w-[100vw] h-[100dvh] fixed top-0 right-0 bg-blue-one flex flex-col items-start justify-between pb-[35px] md:hidden px-[20px] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[105vw]"
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
                  ? "font-modelicabold"
                  : "font-modelicamed hover:font-bold"
              }
              to="/about"
            >
              {language === "en" ? `About` : "Sobre "}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? "font-modelicabold"
                  : "font-modelicamed hover:font-bold"
              }
              to="/methodology"
            >
              {language === "en" ? `Methodology ` : "Metodologia  "}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? "font-modelicabold"
                  : "font-modelicamed hover:font-bold"
              }
              to="/case-studies"
            >
              {language === "en" ? `Case Studies ` : "Estudo de Casos  "}
            </NavLink>
          </li>
          <li className="text-black text-[18px] tracking-[2px] uppercase">
            <NavLink
              onClick={handleClick}
              className={({ isActive }) =>
                isActive
                  ? "font-modelicabold"
                  : "font-modelicamed hover:font-bold"
              }
              to="/contact"
            >
              {language === "en" ? `Contact ` : "Contato  "}
            </NavLink>
          </li>
        </ul>
        <div className="relative text-[12px]">
          <select
            className="border-none outline-none md:text-right w-[100px] bg-transparent pr-[15px]"
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="en">english</option>
            <option value="pt">português</option>
          </select>
        </div>
      </nav>
    </>
  );
}
