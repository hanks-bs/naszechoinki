import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";
const Image = dynamic(() => import("next/image"), { ssr: true });
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import en from "../lib/locales/en/en";
import en_plant_nursery from "../lib/locales/en/plant_nursery";
import pl from "../lib/locales/pl/pl";
import pl_plant_nursery from "../lib/locales/pl/plant_nursery";
import { useRouter } from "next/router";
import { useState } from "react";
import FilesModal from './FilesModal';
import axiosInstance from "./../lib/axios";

const useStyles = makeStyles((theme) => ({
    singleItem: {
        fontWeight: "700",
        textAlign: "center",
        [theme.breakpoints.down(548)]: {
          marginRight: 15,
        },
        
        marginRight: "85px",
        "& > div > div": {
            margin: "5px 0",
          },
      },
      imagefile: {
          position: "relative",
      },
      filesContainer: {
        margin: "40px 0 60px 0",
       
        [theme.breakpoints.down(548)]: {
          justifyContent: "space-around"
        },
      },
      NameFile: {},
      download: {
          "& > a": {
            color: "#3e5411",
          },
      },


}))

export default function FilesDownload(props) {
    const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_plant_nursery : en_plant_nursery;

  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    const response = await axiosInstance.delete(`/api/files_download/${id}`, {
      withCredentials: true,
    });
    if (response.data === true) return router.reload();
  };

  return (
    <>
      <Typography component="h2" variant="h1">
       {t_spec.files_download}
      </Typography>
      <Grid container className={classes.filesContainer}>
      {props.userdata ? (
        <FilesModal open={open} setOpen={setOpen}/>
      ) : null}

      {props.files.length ? (
        props.files.map((elem) => {
          return (      
            <Grid item className={classes.singleItem} key={`file-${elem.id}`}>
            <Grid container direction="column" >
              <Grid item className={classes.imagefile}>
              <Image src={elem.src.split('.')[1] === "pdf" ? `/images/pdf-icon.png` : `/images/excel-icon.png`} alt="Excel icon" width={75} height={75} objectFit="contain"
              quality="75%"/>
              </Grid>
              <Grid item className={classes.NameFile}>
                {locale==='pl' ? elem.title_pl : elem.title_en}
              </Grid>
              <Grid item className={classes.download}>
              <a href={elem.src} download>{t_spec.download.toUpperCase()}</a>
              </Grid>
              {props.userdata ?  <Grid item className={classes.download}>
              <button style={{border: 0, backgroundColor: "transparent", color: "red", cursor: "pointer"}}  onClick={() => {handleDelete(elem.id)}}>Usuń</button>
              </Grid> : null}
            </Grid>
          </Grid>) } ) ) : null }

        




    {props.userdata ? 
    <Grid item className={classes.singleItem}>
      <Grid container direction="column" >
        <Grid item className={classes.imagefile}>
        <Image src={`/images/add-icon.png`} alt="Add icon" width={75} height={75}/>
        </Grid>
        <Grid item className={classes.download}>
        <button onClick={() => {setOpen(true)}} style={{border: 0, backgroundColor: "transparent", color: "#3e5411", fontWeight: 700, cursor: "pointer"}}>Dodaj nowy plik</button>
        </Grid>
        
      </Grid>
    </Grid> : null}
      </Grid>
    </>
  );
}
