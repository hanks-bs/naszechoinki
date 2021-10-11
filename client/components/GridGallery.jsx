import dynamic from "next/dynamic";
import React, { useState, useCallback } from "react";
import Gallery from "./Gallery";
import Carousel, { Modal, ModalGateway } from "./../lib/react-images";
const Container = dynamic(() => import("@material-ui/core/Container"));
import en from "./../lib/locales/en/en";
import en_gallery from "./../lib/locales/en/gallery";
import pl from "./../lib/locales/pl/pl";
import pl_gallery from "./../lib/locales/pl/gallery";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SelectedImage from "./SelectedImage";
import GalleryModal from "./GalleryModal";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          padding: "85px 15px 0 15px",
        },
        padding: "85px 30px 0 30px",
      },
    gallery: {
        overflow: "auto",
    }
}));

const photos = [
    {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 2,
        height: 1
      },
      {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3,
        title: "dasasdsada",
        alt: "123"
      }
  ];
  
  

export default function GridGallery({userdata, items}) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_gallery : en_gallery;



  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"4px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [selectAll]
  );


  return (
   
    <section className={classes.root} id={`gallery`}>
    <Container maxWidth={`lg`}>
    <GalleryModal data={items} open={open} setOpen={setOpen}/>
      <Typography variant="h1" component="h1">
        {t.seedlings}
      </Typography>
      <Typography
        component="p"
        className={classes.pStyle}
        style={{ marginTop: 40, marginBottom: 80 }}
      >
        {t_spec.heading_desc}
      </Typography>
      {(userdata&& editMode) ? (<Gallery lang={t} photos={photos} renderImage={imageRenderer} style={{marignBottom: 40}}/>) : <><Gallery lang={t} photos={photos} onClick={openLightbox} />
      <ModalGateway lang={t}>
        {viewerIsOpen ? (
          <Modal lang={t} onClose={closeLightbox}>
            <Carousel
            lang={t}
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway></>}
      
      
      <style>{`.react-photo-gallery--gallery{margin-bottom: 80px}`}</style>
    </Container>
  </section>
  );
}
