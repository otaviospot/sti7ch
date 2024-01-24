import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

export default function Header() {
  return (
    <header className="w-full top-0 bg-white flex flex-row items-center justify-between z-10 h-[90px] px-[75px]">
      <div className="flex flex-0-auto items-center">
        <Link className="" to="/">
          <img alt="Sti7ch logo" className="w-[134px]" src={logo} />
        </Link>
      </div>

      <div className="flex items-center flex-1 justify-end gap-5">
        <nav className="flex flex-0-auto translate-y-3">
          <ul className="flex flex-row items-center justify-end gap-10">
            <li className="text-black font-modelicamed hover:font-bold text-[18px] uppercase">
              <Link to="/about">About</Link>
            </li>
            <li className="text-black font-modelicamed hover:font-bold text-[18px] uppercase">
              <Link to="/methodology">Methodology</Link>
            </li>
            <li className="text-black font-modelicamed hover:font-bold text-[18px] uppercase">
              <Link to="/case-studies">Case Studies</Link>
            </li>
            <li className="text-black font-modelicamed hover:font-bold text-[18px] uppercase">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
