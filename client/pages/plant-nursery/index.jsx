import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/DefaultLayout"));
const HeroSection = dynamic(() => import("../../components/HeroSection"));
import Head from "next/head";
import en from '../../lib/locales/en/en';
import en_plant_nursery from '../../lib/locales/en/plant_nursery';
import pl from '../../lib/locales/pl/pl';
import pl_plant_nursery from '../../lib/locales/pl/plant_nursery';
import { useRouter } from "next/router";
import PlantNurseryMain from '../../components/PlantNurseryMain';

export default function PlantNursery () {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'pl' ? pl : en;
    const t_spec = locale === 'pl' ? pl_plant_nursery : en_plant_nursery;
    return (
        <>
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
     
      <PlantNurseryMain/>

        </>
    )
}
PlantNursery.Layout = Layout;
