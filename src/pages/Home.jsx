import { useEffect, useState } from "react";
import { apiGetPage } from "../services/apiService";
import style from "./home-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn1Image from "../assets/images/btn1-2.webp";
import { PageMainContent } from "../components/PageMainContent";

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
      <section className="flex relative flex-col justify-center items-start min-h-100v-h bg-blue-one px-[20px] pb-[75px] pt-[0px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title.rendered}
              content={pageContent.content.rendered}
              style={style.content}
            />
            <span
              className={`${style.btn1} absolute right-[20px] flex w-[152px] h-[132px] scale-[.9] transition-all ease-linear duration-500 hover:scale-100`}
            >
              <Link
                className={`btn-1 w-[152px] h-[132px] z-[2] font-modelicamed text-[28px] leading-[30px] flex items-center justify-center`}
                style={{ backgroundImage: `url(${btn1Image})` }}
                to="/about"
              >
                Ready to
                <br />
                Grow?
              </Link>
            </span>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
    </>
  );
}
