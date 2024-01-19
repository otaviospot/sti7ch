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
  const [isShowingCases, setIsShowingCases] = useState(false);

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

  function handleClick(event) {
    event.preventDefault();
    setIsShowingCases(!isShowingCases);
  }

  return (
    <>
      {!isShowingCases ? (
        <section
          className={`flex flex-col justify-center items-start min-h-100v-h bg-orange-one p-[75px] overflow-hidden`}
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
                <span
                  className={`absolute -right-60 bottom-0 flex w-[179px] h-[120px]`}
                >
                  <span
                    className={`w-[205px] h-[193px] z-[2] font-modelicamed text-[31px] leading-[30px] flex items-center justify-center`}
                    style={{
                      backgroundImage: `url(${btn3Image})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                    }}
                    to="/"
                    onClick={handleClick}
                  >
                    Lets's Start
                    <br />
                    Your Puzzle
                  </span>
                </span>
              </div>
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </section>
      ) : (
        <section
          style={{
            backgroundImage: `url(${bgCase})`,
          }}
          className={`${style.caseContent} flex flex-col justify-start  bg-contain bg-no-repeat items-center bg-blue-one px-[75px] py-[20px] overflow-hidden`}
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
                      <img
                        alt="See more"
                        className="w-[20px]"
                        src={arrowDown}
                      />
                    </Link>
                  </div>
                ))}
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </section>
      )}
    </>
  );
}
