import dynamic from "next/dynamic";
import Head from "next/head";
const Layout = dynamic(() => import("./../components/DefaultLayout"));
import CssBaseline from "@material-ui/core/CssBaseline";
const WhyUs = dynamic(() => import("./../components/WhyUs"));
const Contact = dynamic(() => import("./../components/Contact"));
const OurTrees = dynamic(() => import("./../components/OurTrees"));
import en from "./../lib/locales/en/en";
import en_index from "./../lib/locales/en/index";
import pl from "./../lib/locales/pl/pl";
import pl_index from "./../lib/locales/pl/index";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_index : en_index;
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
        <link href="https://fonts.googleapis.com" rel="preconnect" crossOrigin/>
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin/>
        <link href="https://www.google-analytics.com" rel="preconnect" crossOrigin/>
        <link href="https://stats.g.doubleclick.net" rel="preconnect" crossOrigin/>
        <link href="https://www.google.com" rel="preconnect" crossOrigin/>
        <link href="https://apis.google.com" rel="preconnect" crossOrigin/>
        <link href="https://www.gstatic.com" rel="preconnect" crossOrigin/>
        <link href="https://accounts.google.com" rel="preconnect" crossOrigin/>
        <link href="https://ssl.gstatic.com" rel="preconnect" crossOrigin/>
        
      </Head>
      <WhyUs />
      <OurTrees />
      <Contact />
    </>
  );
}

Home.Layout = Layout;
