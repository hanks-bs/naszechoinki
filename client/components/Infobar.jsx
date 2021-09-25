import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => ({
    infobar: {
        position: 'relative',
        backgroundColor: "#191919",
        color: "#fff",
        padding: "2px 30px",
    
        "& a": {
          [theme.breakpoints.down(666)]: {
            marginRight: 0,
            padding: 5,
          },
          marginRight: 10,
          display: "flex",
          alignItems: "center",
    
          "& svg": {
            marginRight: 5,
          },
          "&:nth-child(2), &:nth-child(3) ": {
            [theme.breakpoints.up('sm')]: {
                marginLeft: 10,
              },
            
          },
        },
      },
  }));

export default function Infobar() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(666));

    return (
        <>
        <div className={classes.infobar} >
        <Grid
          container
          direction={matches ? `column` : `row`}
          justifyContent={matches ? `center` : `flex-end`}
          alignItems="center"
        >
          <Link href="mailto:choinkibednarz@gmail.com">
            <a>
              <MailOutlineIcon />
              choinkibednarz@gmail.com 
            </a>
          </Link>
          {matches ? null : '|'}
          <Link href="tel:+48604771938">
            <a>
              <PhoneIcon />
              +48 604 771 938
            </a>
          </Link>
          {matches ? null : '|'}
          <Link href="tel:+48696443291">
            <a>
              <PhoneIcon />
              +48 696 443 291
            </a>
          </Link>
        </Grid>
      </div>
        </>
    )
}
