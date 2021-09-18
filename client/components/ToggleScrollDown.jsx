import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import en from "./../lib/locales/en/en";
import pl from "./../lib/locales/pl/pl";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  ScrollDown: {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 35,
    left: "50%",
    transform: "translateX(-50%)",
    width: 30,
    height: 54,
    border: "3px solid #ffffff7d",
    "&:hover": {
        "&:before":{
            backgroundColor: "#fff",
        },
        border: "3px solid #fff",
    },
    borderRadius: 60,
    "&::before": {
      content: '""',
      width: 12,
      height: 12,
      position: "absolute",
      top: 10,
      left: "50%",
      transform: " translateX(-50%)",
      backgroundColor: "#ffffff7d",
      borderRadius: "50%",
      opacity: 1,
      animation: "$wheel 2s infinite",
    },
  },
  "@keyframes wheel": {
    from: {
      opacity: 1,
      top: 0,
    },
    to: {
      opacity: 0,
      top: 60,
    },
  },
}));

export default function ToggleScrollDown() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;

  return <button onClick={() => {document.querySelectorAll('section')[1].scrollIntoView()}} className={classes.ScrollDown} aria-label={t.scrolldown}></button>;
}
