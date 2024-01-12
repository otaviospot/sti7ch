import { Link } from "react-router-dom";
import logo from "../assets/images/logo.webp";

export default function Header() {
  return (
    <header className="w-full top-0 bg-white flex flex-row items-center justify-between z-10 h-[118px] px-[75px]">
      <div className="flex flex-0-auto items-center">
        <Link className="" to="/">
          <img alt="Sti7ch logo" className="w-[194px]" src={logo} />
        </Link>
      </div>

      <div className="flex items-center flex-1 justify-end gap-5">
        <nav className="flex flex-0-auto">
          <ul className="flex flex-row items-center justify-end gap-5">
            <li className="text-blue-one hover:text-black">
              <Link to="/">About</Link>
            </li>
            <li className="text-blue-one hover:text-black">
              <Link to="/">Methodology</Link>
            </li>
            <li className="text-blue-one hover:text-black">
              <Link to="/">Case Studies</Link>
            </li>
            <li className="text-blue-one hover:text-black">
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
