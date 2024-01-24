import { useEffect, useState, useContext } from 'react';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './about-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn2Image from '../assets/images/btn2.webp';

export default function Methodology() {
  const [pageContent, setPageContent] = useState({});
  const [postTypeContent, setPostTypeContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMethodologyContent, fetchFeaturedImage } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(37);
        setPageContent(backEndContent);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function getPostTypeContent() {
      try {
        const backEndPTContent = await apiGetPostType('methodology');
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
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-pink-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold text-left leading-[6vw] mb-5">
              {pageContent.title.rendered}
            </h1>
            <div className={style.contentMet}>
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
      <section className="bg-bg-one w-full p-[75px] pb-[25px] items-center flex flex-col relative">
        <ul className="flex justify-between w-full">
          {!loading ? (
            <>
              {postTypeContent &&
                [...postTypeContent].reverse().map((item) => (
                  <li
                    key={item.id}
                    className="m-5 flex flex-col justify-center"
                  >
                    <Link
                      to={item.slug}
                      className="flex flex-col justify-center items-center"
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title.rendered}
                          className="mb-3 h-[150px]"
                        />
                      )}
                      <h3 className="text-[20px] font-modelicabold text-center mb-5">
                        {item.title.rendered}
                      </h3>
                    </Link>
                  </li>
                ))}
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </ul>

        <Link
          className={`z-[2] relative font-modelicamed text-[25px] mt-10 leading-[30px] flex items-center justify-center hover:underline`}
          style={{
            cursor: 'pointer',
          }}
          to="/case-studies"
        >
          {`See Case Studies >`}
        </Link>
      </section>
    </>
  );
}
