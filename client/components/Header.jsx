import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Flags from "./Flags";



const useStyles = makeStyles((theme) => ({
  Header: {
    position: "relative",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    padding: "30px 20px",
    margin: "45px 0 20px 0",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <header className={classes.Header}>
        <Flags />
            <Image
              width={445}
              height={61}
              src={"/images/logo.png"}
              alt="Naszchoinki.pl"
              objectFit="contain"
              quality="75%"
            />
      </header>
    </>
  );
}
