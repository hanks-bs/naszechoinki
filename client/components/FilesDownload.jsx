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
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    singleItem: {
        fontWeight: "700",
        textAlign: "center",
        marginRight: "85px",
        "& > div > div": {
            margin: "5px 0",
          },
      },
      imagefile: {
          position: "relative",
      },
      NameFile: {},
      download: {
          "& > a": {
            color: "#3e5411",
          },
      },


}))

export default function FilesDownload() {
    const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_plant_nursery : en_plant_nursery;
  return (
    <>
      <Typography component="h2" variant="h1">
        Pliki do pobrania
      </Typography>
      <Grid container style={{ margin: "40px 0 60px 0" }}>

        <Grid item className={classes.singleItem}>
          <Grid container direction="column" >
            <Grid item className={classes.imagefile}>
            <Image src={`/images/excel-icon.png`} alt="Excel icon" width={75} height={75}/>
            </Grid>
            <Grid item className={classes.NameFile}>
              Plik 1
            </Grid>
            <Grid item className={classes.download}>
            <a href="/images/excel-icon.png" download>POBIERZ</a>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.singleItem}>
        <Grid container direction="column" >
          <Grid item className={classes.imagefile}>
          <Image src={`/images/excel-icon.png`} alt="Excel icon" width={75} height={75}/>
          </Grid>
          <Grid item className={classes.NameFile}>
            Plik 1
          </Grid>
          <Grid item className={classes.download}>
          <a href="/images/excel-icon.png" download>POBIERZ</a>
          </Grid>
        </Grid>
      </Grid>


      <Grid item className={classes.singleItem}>
      <Grid container direction="column" >
        <Grid item className={classes.imagefile}>
        <Image src={`/images/excel-icon.png`} alt="Excel icon" width={75} height={75}/>
        </Grid>
        <Grid item className={classes.NameFile}>
          Plik 1
        </Grid>
        <Grid item className={classes.download}>
        <a href="/images/excel-icon.png" download>POBIERZ</a>
        </Grid>
      </Grid>
    </Grid>


       


      </Grid>
    </>
  );
}
