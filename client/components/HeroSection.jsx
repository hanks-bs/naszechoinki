import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import ToggleScrollDown from './ToggleScrollDown';

const useStyles = makeStyles((theme) => ({
  HeroSection: {
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      height: 9,
      width: "100%",
      backgroundColor: "#000",
      left:0,
    },
    "&::before": {
      top: 0
    },
    "&::after": {
      bottom: 0
    },
    position:"relative",
    height: "67vh",
    backgroundColor: "grey",
    backgroundImage: "url(/images/home/hero-image.jpg)",
    backgroundSize: "cover",
    backgroundPositionY: "65%",
    backgroundPositionX: "50%",
    display: "flex",
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: "center",
    position: "relative",
  },
}));

export default function HeroSection() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <CssBaseline />

      <section
        className={classes.HeroSection}
        style={
          router.pathname !== "/"
            ? { height: '35vh' }
            : null
        }
      >
      {router.pathname !== "/"
            ? null
            :  <ToggleScrollDown/>
      }
      </section>
    </>
  );
}
