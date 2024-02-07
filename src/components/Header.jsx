import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import style from "./header-style.module.css";
import { MyContext } from "../MyContext";

export default function Header() {
  const { language, handleLanguageChange } = useContext(MyContext);

  return (
    <header className="w-full fixed top-0 bg-white flex flex-row items-center justify-between z-20 h-[80px] px-[75px] pt-[15px]">
      <div className="flex flex-0-auto items-center">
        <NavLink className="" to="/">
          <img alt="Sti7ch logo" className="w-[134px]" src={logo} />
        </NavLink>
      </div>

      <div className="flex relative items-center flex-1 justify-end gap-5">
        <div className="absolute -right-[20px] -top-[20px] text-[11px]">
          <select
            className="border-none appearance-none"
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="en">english</option>
            <option value="pt">portuguese</option>
          </select>
        </div>
        <nav className="flex flex-0-auto translate-y-3">
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
                About
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
                Methodology
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
                Case Studies
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
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
