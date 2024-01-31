import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiGetPage } from '../services/apiService';
import style from './home-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn4Img from '../assets/images/btn4.webp';
import logo from '../assets/images/logo-bot.svg';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

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
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-pink-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold text-left">
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
      <section className="flex justify-start gap-[80px] bg-white p-[75px] overflow-hidden">
        <div className="flex flex-col flex-0-auto items-start justify-between">
          <Link className="" to="/">
            <img alt="Sti7ch logo" className="w-[30vw]" src={logo} />
          </Link>
          <nav className="flex gap-5 font-modelicamed text-[22px] items-start justify-start">
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
        <div className="w-full">
          <form
            className="flex flex-col gap-9 w-full font-modelicamed"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="py-[10px] px-[30px] border rounded-3xl text-left h-[120px] flex flex-col">
              <label className="font-modelicamed text-[20px]">Name</label>
              <input
                className="grow"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-pink-one">This field is required</span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border rounded-3xl text-left h-[120px] flex flex-col">
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
            <div className="py-[10px] px-[30px] border rounded-3xl text-left h-[120px] flex flex-col">
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
            <div className="py-[10px] px-[30px] border rounded-3xl text-left h-[120px]  flex flex-col">
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
              className="self-end bg-blue-one font-modelicamed text-black text-[25px] py-[10px] px-[30px] rounded-2xl cursor-pointer hover:bg-orange-one"
              type="submit"
              value="Schedule Consultation"
            />
          </form>
        </div>
      </section>
    </>
  );
}
