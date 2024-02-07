import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiGetPage } from '../services/apiService';
import style from './home-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn4Img from '../assets/images/btn4.webp';
import logo from '../assets/images/logo-bot-2.svg';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { PageMainContent } from '../components/PageMainContent';

export default function Contact() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Here you would integrate with WordPress
    console.log(data);
  };

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(70);
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
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-pink-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title.rendered}
              content={pageContent.content.rendered}
              style={style.content}
            />
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section className="flex flex-col md:flex-row justify-start gap-[80px] bg-white px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        <div className="flex order-2 md:order-1 w-full md:w-auto flex-col flex-0-auto pt-[40px] pb-[40px] gap-[40px] items-start">
          <Link className="" to="/">
            <img alt="Sti7ch logo" className="w-full md:w-[30vw]" src={logo} />
          </Link>
          <nav className="flex w-full md:w-auto gap-5 font-modelicamed text-[22px] items-start justify-center md:justify-start">
            <a
              className="hover:text-pink-one"
              rel="noreferrer"
              target="_blank"
              href="https://intagram.com/_sti7ch"
            >
              <FaInstagram />
            </a>
            <a
              className="hover:text-pink-one"
              rel="noreferrer"
              target="_blank"
              href="https://linkedin.com/company/sti7ch"
            >
              <FaLinkedin />
            </a>
            <a
              className="hover:text-pink-one"
              rel="noreferrer"
              target="_blank"
              href="mailto:info@sti7ch.com"
            >
              <HiOutlineMailOpen />
            </a>
          </nav>
        </div>
        <div className="w-full order-1 md:order-2">
          <form
            className="flex flex-col gap-9 w-full font-modelicamed"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="py-[10px] px-[30px] border-[2px] rounded-3xl text-left h-[100px] flex flex-col">
              <label className="font-modelicamed text-[20px]">Name</label>
              <input
                className="grow"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-pink-one">This field is required</span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border-[2px] rounded-3xl text-left h-[100px] flex flex-col">
              <label className="font-modelicamed text-[20px]">Email</label>
              <input
                className="grow"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <span className="text-pink-one">This field is required</span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border-[2px] rounded-3xl text-left h-[120px] flex flex-col">
              <label className="font-modelicamed text-[20px]">
                Are you looking for
              </label>
              <div className="flex gap-5 grow items-center">
                <label>
                  <input
                    type="radio"
                    value="Business Consultation"
                    className="mr-2"
                    {...register('consultationType', { required: true })}
                  />
                  Business Consultation
                </label>

                <label>
                  <input
                    type="radio"
                    value="Individual Consultation"
                    className="mr-2"
                    {...register('consultationType', { required: true })}
                  />
                  Individual Consultation
                </label>
              </div>
              {errors.consultationType && (
                <span className="text-pink-one">This field is required</span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border-[2px] rounded-3xl text-left h-[250px] md:h-[150px]  flex flex-col">
              <label className="font-modelicamed text-[20px]">
                What challenge can STI7CH help you unravel?
              </label>
              <textarea
                className="grow"
                {...register('message', { required: true })}
              />
              {errors.message && (
                <span className="text-pink-one">This field is required</span>
              )}
            </div>
            <input
              className="self-end w-full md:w-auto bg-blue-one font-modelicamed text-black text-[25px] py-[10px] px-[30px] rounded-2xl cursor-pointer hover:bg-orange-one"
              type="submit"
              value="Schedule Consultation"
            />
          </form>
        </div>
      </section>
    </>
  );
}
