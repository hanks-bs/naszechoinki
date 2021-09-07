import dynamic from "next/dynamic";
import Head from "next/head";
const Layout = dynamic(() => import("./../components/DefaultLayout"));
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {ssr: false});
const HeroSection = dynamic(() => import("./../components/HeroSection"));
const WhyUs = dynamic(() => import("./../components/WhyUs"))
const Contact = dynamic(() => import("./../components/Contact"))
const OurTrees = dynamic(() => import("./../components/OurTrees"))
import en from './../lib/locales/en/en';
import en_index from './../lib/locales/en/index';
import pl from './../lib/locales/pl/pl';
import pl_index from './../lib/locales/pl/index';
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'pl' ? pl : en;
  const t_spec = locale === 'pl' ? pl_index : en_index;
  //console.log(props.userdata)
  return (
    <>
      <CssBaseline />

      <Head>
        <title>{t_spec.title} - Naszechoinki.pl</title>
        <meta name="og:title" property="og:title" content={`${t_spec.title} - Naszechoinki.pl`} />
        
        <meta name="description" content={t_spec.description} />
        <meta name="twitter:card" content={t_spec.description}></meta>
      </Head>
      <HeroSection/>
      <WhyUs />
      <OurTrees />
      <Contact/>
    </>
  );
}

Home.Layout = Layout;
