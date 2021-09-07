import dynamic from "next/dynamic";
import React from "react";
const Grid = dynamic(() => import("@material-ui/core/Grid"), { ssr: true });
const Typography = dynamic(() => import("@material-ui/core/Typography"), {
  ssr: false,
});
const Link = dynamic(() => import("next/link"), { ssr: true });
import Avatar from "@material-ui/core/Avatar";
const Image = dynamic(() => import("next/image"), { ssr: true });
const Divider = dynamic(() => import("@material-ui/core/Divider"), {
  ssr: false,
});
import MailOutlineSharpIcon from "@material-ui/icons/MailOutlineSharp";
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "next/router";
import en from "./../lib/locales/en/en";
import pl from "./../lib/locales/pl/pl";
import Copyright from './Copyright';

const styles = (theme) => ({
  footerStyle: {
    position: "relative",
    minHeight: 300,
 
    backgroundColor: "#191919",
    color: "#fff",
    display: "block",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  footerDirection: {
    [theme.breakpoints.down(656)]: {
      flexDirection: "column",
      gap: 15,
    },
  },
  footerIcons: {
    marginTop: 20,
  },
  footerItemContainer: {
    padding: "15px 30px",
  },
  avatarStyle: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "50%",
  },
  footerPad: {
    padding: "30px 0",
  }
});

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const { router } = this.props;
    const { locale } = router;
    const t = locale === "pl" ? pl : en;

    const links = [
      {
        id: 1,
        to: `/${locale}/`,
        name: t.homepage,
      },
      {
        id: 2,
        to: `/${locale}/${t.link_seedlings}`,
        name: t.seedlings,
      },
      {
        id: 2,
        to: `/${locale}/${t.link_price_list}`,
        name: t.price_list,
      },
      {
        id: 3,
        to: `/${locale}/${t.link_nursery_garden}`,
        name: t.nursery_garden
        ,
      },
      {
        id: 4,
        to: `/${locale}/${t.link_gallery}`,
        name: t.gallery,
      },
      {
        id: 5,
        to: `/${locale}/${t.link_contact}`,
        name: t.contact,
      },
    ];
    return (
      <>
        <footer className={classes.footerStyle}>
          <Grid container direction="column" alignItems="center" className={classes.footerPad}>
            <Grid
              item
              style={{ position: "relative", textAlign: "center" }}
              xs={12}
            >
              <Link href={`/${this.props.router.locale}`}>
                <a>
                  <Image
                    src={"/images/logofooter.png"}
                    alt="Naszechoinki.pl"
                    height={61}
                    width={445}
                    objectFit="contain"
                    quality="100%"
                  />
                </a>
              </Link>
              <Divider
                style={{
                  marginTop: 15,
                  width: 50,
                  justifyContent: "center",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "rgb(255 255 255 / 25%)",
                }}
              />
              <Grid item className={classes.footerItemContainer} xs={12}>
                <Grid container className={classes.footerDirection}>
                  {links.map((item) => {
                    return (
                      <Grid
                        item
                        key={`footer-${item.name}`}
                        style={{ margin: "0 10px" }}
                      >
                        <Link href={item.to} >
                          <a>
                            <Typography>{item.name}</Typography>
                          </a>
                        </Link>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              className={classes.footerIcons}
              container
              direction="row"
              justifyContent="center"
            >
              <Grid item>
                <Link href="mailto:info@trio.pl">
                  <a>
                    <IconButton
                      aria-label="Facebook"
                      TouchRippleProps={{
                        style: { color: "rgb(255 255 255 / 54%)" },
                      }}
                    >
                      <Avatar
                        alt="Znajdź nas na facebook'u"
                        style={{ fontWeight: 800 }}
                        className={classes.avatarStyle}
                      >
                        f
                      </Avatar>
                    </IconButton>
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="mailto:info@trio.pl">
                  <a>
                    <IconButton
                      aria-label="Email"
                      style={{ borderRadius: "50%" }}
                      TouchRippleProps={{
                        style: { color: "rgb(255 255 255 / 54%)" },
                      }}
                    >
                      <Avatar
                        alt="Napisz do nas"
                        className={classes.avatarStyle}
                      >
                        <MailOutlineSharpIcon />
                      </Avatar>
                    </IconButton>
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/">
                  <a>
                    <IconButton
                      aria-label="Instagram"
                      style={{ borderRadius: "50%" }}
                      TouchRippleProps={{
                        style: { color: "rgb(255 255 255 / 54%)" },
                      }}
                    >
                      <Avatar
                        alt="Napisz do nas"
                        className={classes.avatarStyle}
                      >
                        <InstagramIcon />
                      </Avatar>
                    </IconButton>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Copyright/>
        </footer>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Footer));
