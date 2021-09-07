import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import pl from "./../lib/locales/pl/pl";
import en from "./../lib/locales/en/en";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    right: 155,
    transform: "translateX(50%)",
    top: 0,
    [theme.breakpoints.down("xs")]: {
      right: "50%",
      transform: "translateX(50%)",
    },

    display: "flex",
    justifyContent: "center",
    width: 100
  },
  image: {
    padding: "10px !important",
    filter: "drop-shadow(0px 1px 2px #0000002e)",
    "&:hover" : {
      opacity: .5
    },
  }
}));

export default function Flags() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'pl' ? pl : en;
  //const t = pl;
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
 
  return (
    <>
      <div className={classes.container}>
        <a href={`/pl${router.asPath}`} onClick={async (e) => {e.preventDefault(); await Cookies.set("locale", "pl", {expires: 730 }); window.location.pathname = pl[getKeyByValue(locale === 'pl' ? pl : en, router.asPath.replace('/', ''))] ? `/pl/${pl[getKeyByValue(locale === 'pl' ? pl : en, router.asPath.replace('/', ''))]}`: "/pl"}} title={`Zmień na polski`}>
          <Image
            src={"/images/pl.png"}
            width={95}
            height={95}
            alt="Polski"
            className={classes.image}
          />
        </a>
        <a href={`/en${router.asPath}`} onClick={async (e) => {e.preventDefault(); await Cookies.set("locale", "en", {expires: 730 });window.location.pathname = en[getKeyByValue(locale === 'pl' ? pl : en, router.asPath.replace('/', ''))] ? `/en/${en[getKeyByValue(locale === 'pl' ? pl : en, router.asPath.replace('/', ''))]}`: "/en"}} title={`Change to english`}>
          <Image
            src={"/images/en.png"}
            width={95}
            height={95}
            alt="English"
            className={classes.image}
          />
        </a>
      </div>
    </>
  );
}
