import { useEffect, useState, useContext } from 'react';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import style from './methodology-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn2Image from '../assets/images/btn2.webp';
import MethodologyItem from '../components/MethodologyItem';
import { PageMainContent } from '../components/PageMainContent';

export default function Methodology() {
  const [pageContent, setPageContent] = useState({});
  const [postTypeContent, setPostTypeContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMethodologyContent, fetchFeaturedImage, language } =
    useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(37, language);
        setPageContent(backEndContent);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function getPostTypeContent() {
      try {
        const backEndPTContent = await apiGetPostType('methodology', language);
        const postsWithImages = await Promise.all(
          backEndPTContent.map(async (post) => {
            const imageUrl = post.featured_media
              ? await fetchFeaturedImage(post.featured_media)
              : null;
            return { ...post, imageUrl };
          })
        );
        setPostTypeContent(postsWithImages);
        setMethodologyContent(postsWithImages);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPostTypeContent();

    getPageContent();
  }, [language]);

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-pink-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title.rendered}
              content={pageContent.content.rendered}
              style={style.contentMet}
            />
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section className="bg-bg-one w-full px-[20px] py-[35px] md:p-[75px] md:pb-[25px] items-end flex flex-col relative">
        <ul className="flex justify-between w-full flex-col gap-10 md:gap-0 md:flex-row">
          {!loading ? (
            <>
              {postTypeContent &&
                [...postTypeContent]
                  .reverse()
                  .map((item, index) => <MethodologyItem item={item} />)}
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </ul>

        <Link
          className={`z-[2] text-[20px] border-[1.5px] mt-[40px] w-full md:w-auto border-black border-solid py-[5px] px-[20px] font-modelicabold rounded-xl leading-[30px] flex items-center justify-center hover:text-white hover:bg-black`}
          style={{
            cursor: 'pointer',
          }}
          to="/case-studies"
        >
          {language === 'en' ? 'See Case Studies >' : 'Veja estudos de caso'}
        </Link>
      </section>
    </>
  );
}
