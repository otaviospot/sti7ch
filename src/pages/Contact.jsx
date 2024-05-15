import { useEffect, useState, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { MyContext } from '../MyContext';
import Lottie from 'react-lottie';
import { apiGetPage, apiSendForm } from '../services/apiService';
import style from './home-style.module.css';
import Loading from '../components/Loading';
import logo from '../assets/images/logo-bot-2.svg';
import animationLogofrom from '../assets/images/lotties/logo-contact4.json';
import { FaInstagram, FaLinkedin, FaFacebookSquare } from 'react-icons/fa';
import { PageMainContent } from '../components/PageMainContent';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function Contact() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const { language } = useContext(MyContext);
  const [formMessage, setFormMessage] = useState('');
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const lottieRef = useRef(null);

  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
    theme: 'light',
  };

  const animationOptions = {
    loop: false,
    animationData: animationLogofrom,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiSendForm(data);
      toast.success(
        language === 'en'
          ? 'Thank you! We’ll reach out soon to schedule your call'
          : 'Obrigado! Entraremos em contato em breve para agendar sua consultoria.',
        toastOptions
      );
      reset();
    } catch (error) {
      toast.warn(
        language === 'en'
          ? 'Error submitting form'
          : 'Erro ao enviar formulário',
        toastOptions
      );
    }
  };

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(70, language);
        setPageContent(backEndContent);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, [language]);

  return (
    <>
      <ToastContainer />
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-pink-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title && pageContent.title.rendered}
              content={pageContent.content && pageContent.content.rendered}
              style={style.content}
            />
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section className="flex flex-col md:flex-row justify-start gap-[80px] bg-white px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        <div className="flex order-2 md:order-1 w-full md:w-[40%] flex-col flex-0-auto pt-[40px] pb-[100px] gap-[40px] items-start justify-end">
          <img src={logo} alt="sti7ch" className="w-full" />
        </div>
        <div className="w-full order-1 md:order-2">
          <form
            className="flex relative flex-col gap-9 w-full font-modelicamed"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="py-[10px] px-[30px] border border-gray-300 focus-within:border-pink-one rounded-3xl text-left h-[70px] flex flex-col">
              <label className="font-modelicamed text-[16px] md:text-[20px]">
                {language === 'en' ? 'Name' : 'Nome'}
              </label>
              <input
                className="grow appearance-none outline-none"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-pink-one">
                  {language === 'en'
                    ? `This field is required`
                    : 'Campo obrigatório'}
                </span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border border-gray-300 focus-within:border-pink-one rounded-3xl text-left h-[70px] flex flex-col">
              <label className="font-modelicamed text-[16px] md:text-[20px]">
                {language === 'en' ? 'Phone' : 'Telefone'}
              </label>
              <input
                className="grow appearance-none outline-none"
                {...register('phone', { required: true })}
              />
              {errors.name && (
                <span className="text-pink-one">
                  {language === 'en'
                    ? `This field is required`
                    : 'Campo obrigatório'}
                </span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border border-gray-300 focus-within:border-pink-one rounded-3xl text-left h-[70px] flex flex-col">
              <label className="font-modelicamed text-[16px] md:text-[20px]">
                {language === 'en' ? 'Email' : 'E-mail'}
              </label>
              <input
                className="grow appearance-none outline-none"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <span className="text-pink-one">
                  {language === 'en'
                    ? `This field is required`
                    : 'Campo obrigatório'}
                </span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border border-gray-300 focus-within:border-pink-one rounded-3xl text-left h-[120px] flex flex-col">
              <label className="font-modelicamed text-[16px] md:text-[20px]">
                {language === 'en'
                  ? 'Are you looking for business or individual consultation?'
                  : 'Está procurando por consultoria profissional ou para o seu negócio?'}
              </label>
              <div className="flex gap-5 grow items-center">
                <label>
                  <input
                    type="radio"
                    value="Company Consultation"
                    className="mr-2"
                    {...register('consultationType', { required: true })}
                  />
                  {language === 'en' ? 'company' : 'empresarial'}
                </label>

                <label>
                  <input
                    type="radio"
                    value="Individual Consultation"
                    className="mr-2"
                    {...register('consultationType', { required: true })}
                  />
                  {language === 'en' ? 'individual' : 'profissional'}
                </label>
              </div>
              {errors.consultationType && (
                <span className="text-pink-one">
                  {language === 'en'
                    ? `This field is required`
                    : 'Campo obrigatórios'}
                </span>
              )}
            </div>
            <div className="py-[10px] px-[30px] border border-gray-300 focus-within:border-pink-one rounded-3xl text-left h-[220px] md:h-[150px]  flex flex-col">
              <label className="font-modelicamed text-[16px] md:text-[20px]">
                {language === 'en'
                  ? 'What challenge can sti7ch help you unravel?'
                  : 'Que desafio sti7ch pode ajudá-lo a solucionar?'}
              </label>
              <textarea
                className="grow appearance-none outline-none"
                {...register('message', { required: true })}
              />
              {errors.message && (
                <span className="text-pink-one">
                  {language === 'en'
                    ? `This field is required`
                    : 'Campo obrigatório'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between flex-col md:flex-row gap-[30px] md:gap-0">
              <nav className="flex order-2 md:order-1 w-full md:w-auto gap-5 font-modelicamed text-[22px] items-start justify-center md:justify-start">
                <a
                  className="hover:text-pink-one"
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/_sti7ch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
                  href="https://www.facebook.com/profile.php?id=61556191541439&mibextid=AEUHqQ"
                >
                  <FaFacebookSquare />
                </a>
              </nav>

              <input
                className="order-1 md:order-2 self-end w-full md:w-auto bg-blue-one font-modelicamed text-black text-[25px] py-[10px] px-[30px] rounded-2xl cursor-pointer hover:bg-orange-one"
                type="submit"
                value={
                  language === 'en'
                    ? 'Schedule Consultation'
                    : 'Agendar consultoria'
                }
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
