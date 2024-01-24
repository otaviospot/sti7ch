import { useEffect, useState, useContext } from 'react';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './case-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn3Image from '../assets/images/btn3.webp';
import bgCase from '../assets/images/bg-cases.svg';
import arrowDown from '../assets/images/arrowdown.svg';

export default function CaseStudies() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);

  const { caseContent, setCaseContent } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(61);
        const postTypeBackEndContent = await apiGetPostType('case');
        setPageContent(backEndContent);
        setCaseContent(postTypeBackEndContent);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, []);

  return (
    <>
      <section
        className={`flex flex-col justify-center items-start min-h-100v-h2 bg-orange-one p-[75px] overflow-hidden`}
      >
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold text-left leading-[6vw] mb-5">
              {pageContent.title.rendered}
            </h1>
            <div className={style.content}>
              <div
                className="text-content"
                dangerouslySetInnerHTML={{
                  __html: pageContent.content.rendered,
                }}
              ></div>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>

      <section
        style={{
          backgroundImage: `url(${bgCase})`,
        }}
        className={`${style.caseContent} flex flex-col justify-start min-h-100v-h  bg-contain bg-no-repeat items-center bg-blue-one px-[75px] py-[20px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {caseContent &&
              caseContent.map((singlecase) => (
                <div
                  className={` ${style.caseItem} flex flex-col mt-8 w-1/3 items-center text-left`}
                >
                  <span className="font-modelicalight text-[2vw]">
                    {singlecase.title.rendered}
                  </span>
                  <Link className="mt-[30px]" to={singlecase.slug}>
                    <img alt="See more" className="w-[20px]" src={arrowDown} />
                  </Link>
                </div>
              ))}
          </>
        ) : (
          <Loading loading={loading} />
        )}
        <span
          className={`absolute right-20 bottom-20 flex w-[179px] h-[120px]`}
        >
          <Link
            className={`w-[205px] h-[193px] z-[2] font-modelicamed text-[31px] leading-[30px] flex items-center justify-center`}
            style={{
              backgroundImage: `url(${btn3Image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              cursor: 'pointer',
            }}
            to="/contact"
          >
            Let's Start
            <br />
            Your Puzzle
          </Link>
        </span>
      </section>
    </>
  );
}
