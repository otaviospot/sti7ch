import { useEffect, useState } from 'react';
import { apiGetPage } from '../services/apiService';
import style from './home-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn3Image from '../assets/images/btn4.webp';
import Footer from '../components/Footer';

export default function Contact() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(70);
        setPageContent(backEndContent);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h bg-pink-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold text-left">
              {pageContent.title.rendered}
            </h1>
            <div className={style.content}>
              <div
                className="text-content"
                dangerouslySetInnerHTML={{
                  __html: pageContent.content.rendered,
                }}
              ></div>
              <span className={`absolute -right-60 flex w-[179px] h-[120px]`}>
                <Link
                  className={`w-[205px] h-[193px] z-[2] font-modelicamed text-[31px] leading-[30px] flex items-center justify-center`}
                  style={{
                    backgroundImage: `url(${btn3Image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                  }}
                  to="/"
                >
                  Lets's Start
                  <br />
                  Your Puzzle
                </Link>
              </span>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <Footer />
    </>
  );
}
