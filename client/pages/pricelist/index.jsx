import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./../../components/DefaultLayout"));
const HeroSection = dynamic(() => import("./../../components/HeroSection"));
import Head from "next/head";
import en from './../../lib/locales/en/en';
import en_pricelist from './../../lib/locales/en/pricelist';
import pl from './../../lib/locales/pl/pl';
import pl_pricelist from './../../lib/locales/pl/pricelist';
import { useRouter } from "next/router";
import PriceListMain from './../../components/PriceListMain';
import axiosInstance from './../../lib/axios';

export default function Pricelist (props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'pl' ? pl : en;
    const t_spec = locale === 'pl' ? pl_pricelist : en_pricelist;
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

      <PriceListMain userdata={props.userdata} items={props.items}/>

        </>
    )
}

Pricelist.getInitialProps = async (ctx) => {
  const items = await axiosInstance.get('/api/pricelist_items');
  return {items: items.data};
}

Pricelist.Layout = Layout;
