import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import ActiveLink from "./ActiveLink";
import withWidth from "@material-ui/core/withWidth";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "next/router";
import en from "./../lib/locales/en/en";
import en_index from "./../lib/locales/en/index";
import pl from "./../lib/locales/pl/pl";
import pl_index from "./../lib/locales/pl/index";

const styles = (theme) => ({
  iconOpen: {
    "&:hover": {
      background: "transparent",
    },
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: 15,
    color: "#000",
    display: "none",
    [theme.breakpoints.down(816)]: {
      display: "flex",
    },
  },
  List: {
    height: "100%",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  ListItem: {
    padding: "5px 10px",
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
  },
  Nav: {
    overflow: "hidden",
    backgroundColor: "#fff",
    position: "relative",
    zIndex: 1,
    color: "#000",
    boxShadow: "0px 0px 13px 1px #00000014",
    padding: "0 30px",

    width: "55%",
    [theme.breakpoints.down(1575)]: {
      width: "80%",
    },
    [theme.breakpoints.down(1052)]: {
      width: "90%",
    },
    [theme.breakpoints.down(860)]: {
      width: "97%",
    },
    margin: "0 auto",
    borderRadius: 35,
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "center",
    marginBottom: -30,
  },
  navBarOpen: {
    maxHeight: "none",
  },
  ListBox: {
    position: "relative",
    display: "none",
    [theme.breakpoints.up(816)]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  itemStyle: {
    "&:hover": {
      backgroundColor: "#303030a1",
      color: "#fff",
      borderRadius: 25,
    },
    justifyContent: "center",
    marginRight: 15,
    whiteSpace: "nowrap",
    textTransform: "uppercase",
  },
  itemStylePad: {
    [theme.breakpoints.down(950)]: {
      padding: "5px 20px",
      textAlign: "center",
      justifyContent: "center",
    },
  },
  active: {
    "&:hover": {
      backgroundColor: "#303030",
      color: "#fff",
    },
    cursor: "default",
    color: "#fff",
    backgroundColor: "#303030",
    borderRadius: 25,
    position: "relative",
    fontWeight: 500,
  },
  navOpen: {
    [theme.breakpoints.up(816)]: {
      display: "flex",
      justifyContent: "center",
    },
    display: "block",
  },
  buttonOpen: {
    top: 28,
  },
  liststyle: {
    justifyContent: "center",
  },
});

class Navbar extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state.open = false;
  }

  toggleActive() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { userdata, classes, width } = this.props;
    const { router } = this.props;
    const { locale } = router;
    const t = locale === "pl" ? pl : en;
    const t_spec = locale === "pl" ? pl_index : en_index;

    const links = [
      {
        id: 1,
        to: `/${locale}`,
        link: `/`,
        name: t.homepage,
      },
      {
        id: 2,
        to: `/${locale}/${t.link_seedlings}`,
        link: `/${t.link_seedlings}`,
        name: t.seedlings,
      },
      {
        id: 2,
        to: `/${locale}/${t.link_price_list}`,
        link: `/${t.link_price_list}`,
        name: t.price_list,
      },
      {
        id: 3,
        to: `/${locale}/${t.link_nursery_garden}`,
        link: `/${t.link_nursery_garden}`,
        name: t.nursery_garden
        ,
      },
      {
        id: 4,
        to: `/${locale}/${t.link_gallery}`,
        link: `/${t.link_gallery}`,
        name: t.gallery,
      },
      {
        id: 5,
        to: `/${locale}/${t.link_contact}`,
        link: `/${t.link_contact}`,
        name: t.contact,
      },
    ];
    return (
      <>
        <nav
          className={classes.Nav}
          style={{ position: "relative" }}
        >
          <IconButton
            aria-label="Otwórz menu"
            className={clsx(classes.iconOpen, {
              [classes.buttonOpen]: this.state.open,
              [null]: !this.state.open,
            })}
            onClick={() => {
              this.toggleActive();
            }}
          >
            {this.state.open ? (
              <CloseIcon style={{ fontSize: "2rem" }} />
            ) : (
              <MenuIcon style={{ fontSize: "2rem" }} />
            )}
          </IconButton>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems="center" className={classes.GridStyle}>
              <Grid item>
                <List
                  className={clsx(classes.ListBox, {
                    [classes.navOpen]: this.state.open,
                    [null]: !this.state.open,
                  })}
                  style={{ padding: 0 }}
                >
                  {links.map((item) => {
                    return (
                      <ActiveLink
                        key={item.name}
                        activeClassName={classes.active}
                        href={item.to}
                        link={item.link}
                        locale={locale}
                      >
                        <a className={classes.itemStyle}>
                          <ListItem className={classes.liststyle}>
                            {item.name}
                          </ListItem>
                        </a>
                      </ActiveLink>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Toolbar>
        </nav>
      </>
    );
  }
}

export default withStyles(styles)(withWidth()(withRouter(Navbar)));
