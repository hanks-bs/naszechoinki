import dynamic from "next/dynamic";
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {
  ssr: false,
});
import Typography from "@material-ui/core/Typography";
const Container = dynamic(() => import("@material-ui/core/Container"));
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const Image = dynamic(() => import("next/image"), { ssr: true });
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import en from "./../lib/locales/en/en";
import en_seedlings from "./../lib/locales/en/seedlings";
import pl from "./../lib/locales/pl/pl";
import pl_seedlings from "./../lib/locales/pl/seedlings";
import { useRouter } from "next/router";
import Link from "next/link";


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: "85px 15px",
    },
    padding: "85px 30px",
  },
  ContainerBox: {
    padding: 16,
    [theme.breakpoints.down(458)]: {
      textAlign: "center",
    },
  },
  BoxStyle: {
    margin: "50px 0",
    textAlign: "justify",
  },
  ImageBox: {
    float: "left",
    display: "block",
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
    [theme.breakpoints.down("sm")]: {
      padding: "0 15px",
    },
    padding: "0 45px",
    width: 320,
  },
  image: {
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    height: 210,
  },
  pStyle: {
    color: "#505050",
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
}));

export default function SeedlingsMain() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_seedlings : en_seedlings;

  return (
    <>
      <CssBaseline />
      <section className={classes.root} id={`about-us`}>
        <Container maxWidth={`lg`}>
          <Typography variant="h1" component="h1">
            {t.seedlings}
          </Typography>
          <Typography
            component="p"
            className={classes.pStyle}
            style={{ marginTop: 40 }}
          >
            {t_spec.heading_desc}
          </Typography>
          <Box component="div" className={classes.BoxStyle}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              spacing={6}
            >


              <Grid item className={classes.gridItem}>
                <Grid
                  container
                  direction="column"
                  className={classes.heroGridContainer}
                  style={{ overflow: "hidden", textAlign: "center" }}
                >
                  <Grid item style={{ height: "100%", width: "100%" }}>
                    <Box
                      className={classes.image}
                      style={{
                        backgroundImage:
                          "url(https://naszechoinki.pl/lib/fb1tn1/9c0975902916554798f3fcb6ba8d0f25.jpg)",
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.gridDescription}>
                    <Typography
                      component="h3"
                      variant="h5"
                      className={classes.gridHeading}
                    >
                      Jodła kaukaska
                    </Typography>
                    <Typography
                      component="p"
                      className={classes.pStyle}
                      style={{ textAlign: "left" }}
                    >
                      <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.age}: </span> 4 lata
                    </Typography>
                    <Typography
                      component="p"
                      className={classes.pStyle}
                      style={{ textAlign: "left", marginTop: 5 }}
                    >
                      <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.other}: </span> Lorem
                      ipsum
                    </Typography>
                   
                    <Button className={classes.gridItemButton} disableTouchRipple>
                    {t_spec.price} {locale === 'pl' ? `25 ${t_spec.price_sign}` : `${t_spec.price_sign}5`}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.gridItem}>
              <Grid
                container
                direction="column"
                className={classes.heroGridContainer}
                style={{ overflow: "hidden", textAlign: "center" }}
              >
                <Grid item style={{ height: "100%", width: "100%" }}>
                  <Box
                    className={classes.image}
                    style={{
                      backgroundImage:
                        "url(https://naszechoinki.pl/lib/fb1tn1/9c0975902916554798f3fcb6ba8d0f25.jpg)",
                    }}
                  />
                </Grid>
                <Grid item className={classes.gridDescription}>
                  <Typography
                    component="h3"
                    variant="h5"
                    className={classes.gridHeading}
                  >
                    Jodła kaukaska
                  </Typography>
                  <Typography
                    component="p"
                    className={classes.pStyle}
                    style={{ textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.age}: </span> 4 lata
                  </Typography>
                  <Typography
                    component="p"
                    className={classes.pStyle}
                    style={{ textAlign: "left", marginTop: 5 }}
                  >
                    <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.other}: </span> Lorem
                    ipsum
                  </Typography>
                 
                  <Button className={classes.gridItemButton} disableTouchRipple>
                  {t_spec.price} {locale !== 'pl' ? `25 ${t_spec.price_sign}`: `${t_spec.price_sign}5`}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.gridItem}>
            <Grid
              container
              direction="column"
              className={classes.heroGridContainer}
              style={{ overflow: "hidden", textAlign: "center" }}
            >
              <Grid item style={{ height: "100%", width: "100%" }}>
                <Box
                  className={classes.image}
                  style={{
                    backgroundImage:
                      "url(https://naszechoinki.pl/lib/fb1tn1/9c0975902916554798f3fcb6ba8d0f25.jpg)",
                  }}
                />
              </Grid>
              <Grid item className={classes.gridDescription}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.gridHeading}
                >
                  Jodła kaukaska
                </Typography>
                <Typography
                  component="p"
                  className={classes.pStyle}
                  style={{ textAlign: "left" }}
                >
                  <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.age}: </span> 4 lata
                </Typography>
                <Typography
                  component="p"
                  className={classes.pStyle}
                  style={{ textAlign: "left", marginTop: 5 }}
                >
                  <span style={{ fontWeight: 700, color: "#000" }}>{t_spec.other}: </span> Lorem
                  ipsum
                </Typography>
               
                <Button className={classes.gridItemButton} disableTouchRipple>
                {t_spec.price} {locale === 'pl' ? `25 ${t_spec.price_sign}`: `${t_spec.price_sign}5`}
                </Button>
              </Grid>
            </Grid>
          </Grid>

             

              </Grid>
          </Box>
        </Container>
      </section>
    </>
  );
}
