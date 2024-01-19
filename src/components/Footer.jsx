import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-bot.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-white flex flex-row justify-between p-[75px]">
      <div className="flex flex-0-auto items-end justify-start">
        <Link className="" to="/">
          <img alt="Sti7ch logo" className="w-[25vw]" src={logo} />
        </Link>
      </div>

      <div className="flex flex-col flex-1 gap-5 items-start justify-start pl-10">
        <p className="font-modelicalight text-[32px] text-left">
          If you have ideas for your brand, your business, or the world at
          large, we're here to listen and collaborate.<br></br>We can design a
          more human future together.
        </p>
        <nav className="flex flex-col font-modelicamed text-[22px] items-start justify-start">
          <a
            className="underline"
            rel="noreferrer"
            target="_blank"
            href="https://"
          >
            Twitter
          </a>
          <a
            className="underline"
            rel="noreferrer"
            target="_blank"
            href="https://"
          >
            Instagram
          </a>
          <a
            className="underline"
            rel="noreferrer"
            target="_blank"
            href="https://"
          >
            Linkedin
          </a>
        </nav>
        <nav className="flex flex-0-auto">
          <ul className="flex flex-col items-start justify-startgap-5 font-modelicalight">
            <li className="text-black hover:text-blue-one text-[18px] uppercase">
              <Link to="/about">About</Link>
            </li>
            <li className="text-black hover:text-blue-one text-[18px] uppercase">
              <Link to="/methodology">Methodology</Link>
            </li>
            <li className="text-black hover:text-blue-one text-[18px] uppercase">
              <Link to="/">Case Studies</Link>
            </li>
            <li className="text-black hover:text-blue-one text-[18px] uppercase">
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
