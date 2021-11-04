import dynamic from "next/dynamic";
import Head from "next/head";
const Layout = dynamic(() => import("./../../components/DefaultLayout"));
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {ssr: false});
const TermsMain = dynamic(() => import("./../../components/TermsMain"))
import en from './../../lib/locales/en/en';
import en_terms from './../../lib/locales/en/terms';
import pl from './../../lib/locales/pl/pl';
import pl_terms from './../../lib/locales/pl/terms';
import { useRouter } from "next/router";


export default function TermsOfService(props) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'pl' ? pl : en;
  const t_spec = locale === 'pl' ? pl_terms : en_terms;

  return (
    <>
      <CssBaseline />

      <Head>
      <title>{t_spec.title} - Naszechoinki.pl</title>
      <meta name="og:title"property="og:title"content={`${t_spec.title} - Naszechoinki.pl`}/>
    
      <meta name="og:image" content="https://www.naszechoinki.pl/images/home/hero-image.jpg" />
     
      <meta name="og:description"content={t_spec.description}/>
      <meta name="description" content={t_spec.description} />
      <meta name="twitter:card" content={t_spec.description} />

      <meta name="keywords" content={t_spec.keywords} />
      <meta name="subject" content={t_spec.subject} />

    </Head>
     
      <TermsMain/>
      
     
    </>
  )
}

TermsOfService.Layout = Layout;
