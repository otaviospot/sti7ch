import { useEffect, useState } from 'react';
import { apiGetPage } from '../services/apiService';
import style from './home-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn1Image from '../assets/images/btn1.webp';

export default function Home() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(14);
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
      <section className="flex flex-col justify-center items-start min-h-100v-h bg-blue-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold">
              {pageContent.title.rendered}
            </h1>
            <div className={style.content}>
              <div
                className="text-content"
                dangerouslySetInnerHTML={{
                  __html: pageContent.content.rendered,
                }}
              ></div>
              <span
                className={`${style.btn1} absolute -right-60 flex w-[179px] h-[120px] scale-[.8]`}
              >
                <Link
                  className={`btn-1 w-[179px] h-[120px] z-[2] font-modelicamed text-[28px] leading-[30px] flex items-center justify-center`}
                  style={{ backgroundImage: `url(${btn1Image})` }}
                  to="/about"
                >
                  Ready to
                  <br />
                  Grow?
                </Link>
              </span>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
    </>
  );
}
