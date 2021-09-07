import dynamic from "next/dynamic";
import en from "./../lib/locales/en/en";
import en_index from "./../lib/locales/en/index";
import pl from "./../lib/locales/pl/pl";
import pl_index from "./../lib/locales/pl/index";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: "#191919",
    marginTop: 50,
  },
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down(1198)]: {
      padding: "140px 30px 50px 30px",
    },
    padding: "75px 30px 50px 30px",
    flexWrap: "wrap",
  },
  item: {
    position: "relative",
    width: 290,
    height: 500,
    backgroundColor: "#1e1e1e",
    borderRadius: 45,
    margin: 15,
    backgroundPosition: "50%",
    backgroundSize: "cover",
    overflow: "hidden",
  },
  button: {
      backgroundColor: "#fff",
      color: theme.palette.defaultColor,
      marginBottom: 30, 
      left: "50%",
      transform: "translateX(-50%)",
  },
  heading: {
    textAlign: "center",
    backgroundColor:  theme.palette.defaultColor,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      padding: "12px 35px",
    },
    padding: "12px 95px",
    borderRadius: 20,
    position: "absolute",
    transform: "translateX(-50%)",
    left: "50%",
    top: -55,
    "&:before": {
      height:0,
      width:0,
    },
  },
  description: {
    position: "absolute", 
    bottom: 0,
    backgroundColor: "#ffffffd4",
    width: "100%",

    "& > h3": {
      fontSize: "1.75rem",
      textAlign: "center",
      padding: "25px 0",
      color: "#3e5411",
      maxWidth: 150,
      margin: "0 auto",
    },
  },

}));

export default function OurTrees() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_index : en_index;

  return (
    <>
      <section id="our-trees" className={classes.root}>
      <Typography component={`h1`} variant="h1" className={classes.heading}>{t_spec.our_trees}</Typography>
        <Container maxWidth={`lg`} p={3} className={classes.container}>
       
          <Grid item className={classes.item} style={{backgroundImage: "url('./images/home/jod-kau.jpg')"}}>
          <Box className={classes.description}>
          <Typography component="h3" variant="h3">{t_spec.cau_fir}</Typography>
          </Box>
          </Grid>
         

          <Grid item className={classes.item} style={{backgroundImage: "url('./images/home/swierk.jpg')"}}>
          <Box className={classes.description}>
          <Typography component="h3" variant="h3">{t_spec.blue_spruce}</Typography>
          </Box>
          </Grid>
          

          <Grid item className={classes.item} style={{backgroundImage: "url('./images/home/swierk-pos.jpg')"}}>
          <Box className={classes.description}>
          <Typography component="h3" variant="h3">{t_spec.Nor_spruce}</Typography>
          </Box>
          </Grid>
          

        </Container>
       <Link href={`/${locale}/${t.link_price_list}`} passHref>
        <Button  className={classes.button} aria-label={t_spec.check_offer}>{t_spec.check_offer}</Button>
        </Link>
      </section>
    </>
  );
}
