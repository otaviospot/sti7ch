import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './singleCase-style.module.css';
import Loading from '../components/Loading';
import telephone from '../assets/images/telephone.svg';

export default function SingleCase() {
  const [postContent, setPostContent] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const { caseContent } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    const fetchPostContent = async () => {
      if (caseContent.length > 0) {
        const post = caseContent.find((p) => p.slug === slug);
        if (post) {
          setPostContent(post);
        }
      }
      setLoading(false);
    };

    fetchPostContent();
  }, [slug, caseContent]);

  return (
    <>
      <section
        className={`flex relative flex-row justify-start items-start min-h-100v-h bg-blue-one pr-[75px] py-[75px] overflow-hidden`}
      >
        {!loading ? (
          <>
            <img alt="Telefone" className="w-[60%]" src={telephone} />
            <div className="z-[2] flex w-[40%] relative grow items-center justify-end">
              <div
                className={`${style.content} text-left]`}
                dangerouslySetInnerHTML={{
                  __html: postContent.content && postContent.content.rendered,
                }}
              ></div>
            </div>
          </>
        ) : (
          <Loading loading={loading} color={'#54BCCA'} />
        )}
      </section>
    </>
  );
}
