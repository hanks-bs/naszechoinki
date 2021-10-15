import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/DefaultLayout"));
import Head from "next/head";
import en from '../../lib/locales/en/en';
import en_gallery from '../../lib/locales/en/gallery';
import pl from '../../lib/locales/pl/pl';
import pl_gallery from '../../lib/locales/pl/gallery';
import { useRouter } from "next/router";
import GridGallery from './../../components/GridGallery';
import axiosInstance from './../../lib/axios';

export default function Gallery (props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'pl' ? pl : en;
    const t_spec = locale === 'pl' ? pl_gallery : en_gallery;
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
     
      <GridGallery userdata={props.userdata} items={props.items} />

        </>
    )
}
Gallery.getInitialProps = async (ctx) => {
  const items = await axiosInstance.get('/api/gallery');
  return {items: items.data.sort((a, b) => {
    return a.id - b.id;
  })};
}


Gallery.Layout = Layout;
