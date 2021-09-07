import App from "next/app";
import { AnimatePresence } from "framer-motion";
import { authenticate } from "../lib/authentication.jsx";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Cookies from "js-cookie";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import en from "../lib/locales/en/en";
import en_index from "../lib/locales/en/index";
import pl from "../lib/locales/pl/pl";
import pl_index from "../lib/locales/pl/index";

const breakpoints = createBreakpoints({});

const themeLight = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        "&:hover": {
          color: "#3e5411",
          backgroundColor: "transparent",
        },
        color: "#fff",
        backgroundColor: "#3e5411",
        padding: "7px 32px",
        borderRadius: 20,
        fontWeight: "700",
        fontSize: ".9rem",
        textTransform: "none",
      },
    },
    MuiCssBaseline: {
      "@global": {
        html: {
          "& a": {
            color: "inherit",
            textDecoration: "none",
          },
        },
        "html, body": {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
  palette: {
    defaultColor: "#3e5411",
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "'Comfortaa', cursive",
    h1: {
      position: "relative",
      color: "#3e5411",
      display: "initial",
      fontWeight: 700,
      fontSize: "3.5rem",
      [breakpoints.down(610)]: {
        fontSize: "3.2rem",
      },
      [breakpoints.down(438)]: {
        fontSize: "2.6rem",
      },
      padding: "20px 0",
      "&:before": {
        position: "absolute",
        content: '""',
        height: 8,
        width: 100,
        backgroundColor: "#3e5411",
        left: 0,
        bottom: 0,
      },
    },
    h5: {
      [breakpoints.down(610)]: {
        fontSize: "1.3rem",
      },
      [breakpoints.down(438)]: {
        fontSize: "1.2rem",
      },
    },
    body2: {
      [breakpoints.down(610)]: {
        fontSize: "0.8rem",
      },
    },
    body1: {
      [breakpoints.down(610)]: {
        fontSize: "0.8rem",
      },
    },
  },
});

class MyApp extends App {
  state = {};
  constructor(props) {
    super(props);
    this.state.userdata = undefined;
    this.authenticate = authenticate.bind(this);

    !Cookies.get("locale")
      ? Cookies.set("locale", "pl", { expires: 730 })
      : null;
  }
  async componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    await this.authenticate();

    this.props.router.push(
      () => {
        return undefined;
      },
      `/${Cookies.get("locale")}${this.props.router.asPath}`,
      { locale: Cookies.get("locale") }
    );
  }
  render() {
    const { Component, pageProps, router } = this.props;
    const Layout = Component.Layout || EmptyLayout;
    const { locale } = router;
    const t = locale === "pl" ? pl : en;
    const t_spec = locale === "pl" ? pl_index : en_index;

    return (
      <>
        <Head>
          <title>Naszechoinki.pl</title>
          <meta name="description" content={t_spec.description} />
          <link rel="icon" type="image/png" href="./favicon.png" />

          <meta name="fb:page_id" content="1510889432343866" />
          <meta name="og:type" content="website" />
          <meta name="og:url" content="https://www.naszechoinki.pl/" />
          <meta name="og:site_name" content="naszechoinki.pl" />
          <meta name="og:email" content="choinkibednarz@gmail.com" />
          <meta name="og:phone_number" content="696-443-291" />

          <meta name="og:latitude" content="50.4419246" />
          <meta name="og:longitude" content="20.9150369" />
          <meta name="og:street-address" content="Wolica 124" />
          <meta name="og:locality" content="Stopnica" />
          <meta name="og:region" content="świętokrzyskie" />
          <meta name="og:postal-code" content="28-130" />
          <meta name="og:country-name" content="PL" />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta content="yes" name="apple-touch-fullscreen" />
          <meta name="apple-mobile-web-app-status-bar-style"content="black" />
          <link rel="apple-touch-icon" href="./images/favicon.png" />
          <link rel="apple-touch-icon" type="image/png" href="./images/favicon.png" />

          <meta name="robots" content="notranslate" />
          <meta name="designer" content="Wiktor Poniewierski" />
          <meta name="copyright" content="naszechoinki.pl" />
          <meta name="reply-to" content="choinkibednarz@gmail.com" />
          <meta name="owner" content="naszechoinki.pl" />
          <meta name="url" content="http://www.naszechoinki.pl" />
          <meta name="identifier-URL" content="https://www.naszechoinki.pl" />
          <meta
            name="author"
            content="Wiktor Poniewierski, wiktor.poniewierski09@gmail.com"
          />
        </Head>
        <ThemeProvider theme={themeLight}>
          <Layout userdata={this.state.userdata}>
            <AnimatePresence exitBeforeEnter>
              <Component
                {...pageProps}
                key={router.route}
                userdata={this.state.userdata}
              />
            </AnimatePresence>
          </Layout>
        </ThemeProvider>
      </>
    );
  }
}

export default withRouter(MyApp);

const EmptyLayout = ({ children }) => <>{children}</>;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
