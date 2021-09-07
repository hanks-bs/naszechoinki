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
import en_index from "./../lib/locales/en/index";
import pl from "./../lib/locales/pl/pl";
import pl_index from "./../lib/locales/pl/index";
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
  },
  image: {
    padding: "25px 50px",
    textAlign: "center",
  },
  pStyle: {
    color: "#505050",
  },
}));

export default function WhyUs() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_index : en_index;

  return (
    <>
      <CssBaseline />
      <section className={classes.root} id={`about-us`}>
        <Container maxWidth={`lg`} p={3}>
          <Typography variant="h1" component="h2" align="center">
            {t_spec.why_us}?
          </Typography>
          <Box component="div" className={classes.BoxStyle}>
            <Grid container direction="row" justifyContent="center">
              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Grid container direction="column">
                  <Grid item>
                    <Box className={classes.image}>
                      <Image
                        width={97}
                        height={97}
                        objectFit="contain"
                        src={"/images/home/info-icon.png"}
                        alt="Naszchoinki.pl"
                        quality="75%"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="h3"
                      variant="h5"
                      style={{
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 15,
                      }}
                    >
                      {t_spec.heading1}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      style={{ textAlign: "center" }}
                    >
                      {t_spec.description1}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Grid container direction="column">
                  <Grid item>
                    <Box className={classes.image}>
                      <Image
                        width={97}
                        height={97}
                        objectFit="contain"
                        src={"/images/home/shopping-icon.png"}
                        alt="Naszchoinki.pl"
                        quality="75%"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="h3"
                      variant="h5"
                      style={{
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 15,
                      }}
                    >
                      {t_spec.heading2}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      style={{ textAlign: "center" }}
                    >
                      {t_spec.description2}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Grid container direction="column">
                  <Grid item>
                    <Box className={classes.image}>
                      <Image
                        width={97}
                        height={97}
                        objectFit="contain"
                        src={"/images/home/delivery-icon.png"}
                        alt="Naszchoinki.pl"
                        quality="75%"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="h3"
                      variant="h5"
                      style={{
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 15,
                      }}
                    >
                      {t_spec.heading3}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      style={{ textAlign: "center" }}
                    >
                      {t_spec.description3}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Link href={`/${locale}`} passHref>
            <Button
              className={classes.buttonStyle}
              aria-label={t_spec.see_pricelist}
            >
              {t_spec.see_pricelist}
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
