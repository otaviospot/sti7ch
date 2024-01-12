import { useEffect, useState } from "react";
import { apiGetPage } from '../services/apiService';
import style from "./home-style.module.css";
import Loading from "../components/Loading";

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
    <section className="flex flex-col justify-center items-start min-h-100v-h bg-blue-one p-[75px]">
            {!loading ? (
                <>
        <h1 className="text-[7vw] font-modelicabold">{pageContent.title.rendered}</h1>
        <div className={style.content} dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }}>

        </div>
        </>
          ) : (
            <Loading loading={loading} />
          )}
    </section>
  )
}
