/* eslint-disable react/no-unescaped-entities */
import dynamic from "next/dynamic";
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {
  ssr: false,
});
import Typography from "@material-ui/core/Typography";
const Container = dynamic(() => import("@material-ui/core/Container"));
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import en from "../lib/locales/en/en";
import en_plant_nursery from "../lib/locales/en/plant_nursery";
import pl from "../lib/locales/pl/pl";
import pl_plant_nursery from "../lib/locales/pl/plant_nursery";
import { useRouter } from "next/router";
import Link from "next/link";
import FilesDownload from "./FilesDownload";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: "85px 15px 0 15px",
    },
    padding: "85px 30px 0 30px",
  },
  ContainerBox: {
    padding: 16,
    [theme.breakpoints.down(458)]: {
      textAlign: "center",
    },
  },
  BoxStyle: {
    position: "relative",
    margin: "50px 0",
    
  },

  buttonStyle: {
    left: "100%",
    transform: "translateX(-100%)",

    [theme.breakpoints.down("xs")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  gridItem: {
    position: "relative",
    "&:not(:last-of-type)" : {
      "&::after": {
        content: "''",
        height: 1,
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
          },
        backgroundColor: "rgb(0 0 0 / 0.15)",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
  
    },
    },
    
    [theme.breakpoints.down("sm")]: {
      padding: "75px 15px",
    },
    padding: "75px 45px",
  },
  image: {
    [theme.breakpoints.down(500)]: {
      width: "100%",
     },
    [theme.breakpoints.up(840)]: {
      width: "40%",
     },
     [theme.breakpoints.up(950)]: {
      width: "35%",
     },
    [theme.breakpoints.down(610)]: {
      fontSize: "0.8rem",
    },

    boxShadow: "0px 0px 15px 1px #00000026",
    width: 400,
    height: 350,
    borderRadius: 55,
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  },
  pStyle: {
    color: "#505050",
    margin: "10px 0",
    fontSize: ".875rem",
    [theme.breakpoints.down(610)]: {
      fontSize: "0.8rem",
    },

  },
  heroGridContainer: {
    boxShadow: "0px 0px 15px 1px #00000026",

    borderRadius: 35,
    margin: "0 auto",
  },
  gridHeading: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#3e5411",
  },
  gridDescription: {
    [theme.breakpoints.up(840)]: {
     width: "58.33333%",
    },
    [theme.breakpoints.down(658)]: {
        padding: "20px 0",
      },
    padding: 20,
  },
  gridItemButton: {
    marginTop: 25,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#3e5411",
      cursor: "default",
    },
  },
  orderBox: {
    textAlign: "center",
    marginBottom: 20,
    "& > button": {
      fontSize: "1.3rem",
      [theme.breakpoints.down(840)]: {
        flexDirection: "column-reverse",
      },
      padding: "8px 70px",
      borderRadius: 30,
    },
  },
  gridRow: {
    [theme.breakpoints.down(840)]: {
      flexDirection: "column-reverse",
    },
    alignItems: "center",
    justifyContent: "space-around",
  },

}));

export default function PlantNurseryMain() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_plant_nursery : en_plant_nursery;
  return (
    <>
      <section className={classes.root} id={`about-us`}>
        <Container maxWidth={`lg`}>

          <Typography variant="h1" component="h1">
            {t.plant_nursery}
          </Typography>
          <Typography
            component="p"
            className={classes.pStyle}
            style={{ marginTop: 40 }}
          >
            {t_spec.heading_desc}
          </Typography>
          <Box component="div" className={classes.BoxStyle}>
            <Grid container direction="column">
              <Grid item className={classes.gridItem}>
                <Grid container direction="row" className={classes.gridRow}>
                  <Grid
                    item
                    className={classes.image}
                    style={{
                      backgroundImage:
                        "url('https://naszechoinki.pl/files/dynamicContent/sites/fb1tn1/images/pl/webpage_27/kqlwg2o5/element_399/20180914_165238.webp')",
                    }}
                  />

                  <Grid item className={classes.gridDescription}>
                    <Typography
                      className={classes.gridHeading}
                      component="h2"
                      variant="h5"
                    >
                      Oferta handlowa
                    </Typography>
                    <Typography component="p" className={classes.pStyle}>
                      <span style={{ fontWeight: 700, color: "#000" }}>
                        {t_spec.description}:{" "}
                      </span>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.gridItem}>
                <Grid container direction="row" className={classes.gridRow}>
                  <Grid
                    item
                    className={classes.image}
                    style={{
                      backgroundImage:
                        "url('https://naszechoinki.pl/files/dynamicContent/sites/fb1tn1/images/pl/webpage_27/kqlwg2o5/element_399/20180914_165238.webp')",
                    }}
                  />

                  <Grid item className={classes.gridDescription}>
                    <Typography
                      className={classes.gridHeading}
                      component="h2"
                      variant="h5"
                    >
                      Oferta handlowa
                    </Typography>
                    <Typography component="p" className={classes.pStyle}>
                      <span style={{ fontWeight: 700, color: "#000" }}>
                        {t_spec.description}:{" "}
                      </span>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.gridItem}>
                <Grid container direction="row" className={classes.gridRow}>
                  <Grid
                    item
                    className={classes.image}
                    style={{
                      backgroundImage:
                        "url('https://naszechoinki.pl/files/dynamicContent/sites/fb1tn1/images/pl/webpage_27/kqlwg2o5/element_399/20180914_165238.webp')",
                    }}
                  />

                  <Grid item className={classes.gridDescription}>
                    <Typography
                      className={classes.gridHeading}
                      component="h2"
                      variant="h5"
                    >
                      Oferta handlowa
                    </Typography>
                    <Typography component="p" className={classes.pStyle}>
                      <span style={{ fontWeight: 700, color: "#000" }}>
                        {t_spec.description}:{" "}
                      </span>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
              </Grid>
          </Box>
          <FilesDownload />
          
        </Container>
      </section>
    </>
  );
}
