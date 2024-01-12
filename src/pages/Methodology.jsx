import { useEffect, useState } from "react";
import { apiGetPage, apiGetPostType } from "../services/apiService";
import style from "./about-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn1Image from "../assets/images/btn1.webp";

export default function Methodology() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);

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

    getPageContent();
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h bg-orange-one p-[75px] overflow-hidden">
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
    </>
  );
}
