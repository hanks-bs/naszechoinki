import dynamic from "next/dynamic";
import en from "../lib/locales/en/en";
import pl from "../lib/locales/pl/pl";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
const Grid = dynamic(() => import("@material-ui/core/Grid"), { ssr: true });
import clsx from "clsx";


const useStyles = makeStyles((theme) => ({
    copyright: {
        textAlign: "center",
        backgroundColor: "#000",
        padding: "8px 15px",
        color: "#fff",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down(1118)]: {
            justifyContent: "start"
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
          },
        justifyContent: "center"

    },
    author: {
        position: "absolute",
        right: 15,
        [theme.breakpoints.down("sm")]: {
            position: "relative",
            right: 0,
          },
    },
    gridItem: {
        [theme.breakpoints.down("sm")]: {
            padding: 5,
          },
       
    }
  }));
  

export default function Copyright () {
    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;
    const t = locale === "pl" ? pl : en;
    return (
        <>
        <Grid 
        container
        className={classes.copyright} 
        
        >
        <Grid item className={classes.gridItem}>
       {t.rights_reserved} © naszechoinki.pl
        </Grid>
      <Grid item className={clsx(classes.author, classes.gridItem )}>
      <a href="mailto:wiktor.poniewierski09@gmail.com">{t.realization} Wiktor Poniewierski</a>
      </Grid>
        </Grid>
       <div >
       
       <div>
       </div>
       </div>
        </>
    )
}