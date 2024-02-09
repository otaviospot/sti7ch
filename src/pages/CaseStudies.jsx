import { useEffect, useState, useContext } from 'react';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './case-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn3Image from '../assets/images/btn3.webp';
import bgCase from '../assets/images/bg-cases.svg';
import SingleCase from '../components/SingleCase';
import { PageMainContent } from '../components/PageMainContent';

export default function CaseStudies() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [openPopupId, setOpenPopupId] = useState(null);

  const { caseContent, setCaseContent, language } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(61, language);
        const postTypeBackEndContent = await apiGetPostType('case', language);
        setPageContent(backEndContent);
        setCaseContent(postTypeBackEndContent);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, [language]);

  return (
    <>
      <section
        className={`flex flex-col justify-center items-start min-h-100v-h2 bg-orange-one px-[20px] py-[35px] md:p-[75px] overflow-hidden`}
      >
        {!loading ? (
          <PageMainContent
            title={pageContent.title.rendered}
            content={pageContent.content.rendered}
            style={style.content}
          />
        ) : (
          <Loading loading={loading} />
        )}
      </section>

      <section
        style={{
          backgroundImage: `url(${bgCase})`,
        }}
        className={`${style.caseContent} flex flex-col justify-start min-h-100v-h md:bg-contain bg-no-repeat items-center bg-blue-one px-[20px] pt-[20vh] md:pt-[20px] md:px-[75px] py-[20px] pb-[200px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {caseContent &&
              caseContent.map((singlecase) => (
                <SingleCase
                  singlecase={singlecase}
                  openPopupId={openPopupId}
                  setOpenPopupId={setOpenPopupId}
                />
              ))}
          </>
        ) : (
          <Loading loading={loading} />
        )}
        <span
          className={`relative scale-[.8] md:absolute md:right-20 md:bottom-20 flex w-[225px] h-[120px] mt-[100px] md:mt-0`}
        >
          <Link
            className={`w-[225px] h-[193px] z-[2] font-modelicamed text-[29px] leading-[30px] flex items-center justify-center bg-contain bg-no-repeat bg-center cursor-pointer`}
            style={{
              backgroundImage: `url(${btn3Image})`,
            }}
            to="/contact"
          >
            {language === 'en' ? `Let's Start` : 'Começar seu'}
            <br />
            {language === 'en' ? 'Your Puzzle' : 'quebra-cabeças'}
          </Link>
        </span>
      </section>
    </>
  );
}
