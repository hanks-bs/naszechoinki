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
          }
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
      [breakpoints.down(360)]: {
        fontSize: "2.9rem",
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
          <link rel="icon" href="./images/favicon.png" />
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
