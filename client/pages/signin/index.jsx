import dynamic from "next/dynamic";
import { Component } from "react";
import axios from "axios";
const CssBaseline= dynamic(() => import("@material-ui/core/CssBaseline"), {ssr: false});
import { withStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
const  Grid = dynamic(() => import("@material-ui/core/Grid"), {ssr: false});
const  TextField  = dynamic(() => import('@material-ui/core/TextField'));
const Layout = dynamic(() => import("./../../components/DefaultLayout"));
import Paper from "@material-ui/core/Paper";
import  Avatar from "@material-ui/core/Avatar";
const LockIcon = dynamic(() => import("@material-ui/icons/Lock"), {ssr: false});
const AccountCircle = dynamic(() => import("@material-ui/icons/AccountCircle"), {ssr: false});
import Button from "@material-ui/core/Button";
const FormControlLabel = dynamic(() => import("@material-ui/core/FormControlLabel"), {ssr: false});
const  Checkbox =  dynamic(() => import("@material-ui/core/Checkbox"));
const VpnKeyIcon = dynamic(() =>import("@material-ui/icons/VpnKey"), {ssr: false});
import CircularProgress from "@material-ui/core/CircularProgress";
const CheckIcon = dynamic(() => import("@material-ui/icons/Check"), {ssr: false});
import { withRouter } from "next/router";
const Head = dynamic(() => import("next/head"));

const styles = (theme) => ({
  root: {
    display: "flex",
    padding: 45,
  },
  wrapper: {
    margin: `${theme.spacing(1)}px auto`,
    position: "relative",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paperStyle: {
    padding: 20,
    display: "grid",

    width: "100%",
    margin: "20px auto",
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0px 6px 20px 0px #0000001f",
    [theme.breakpoints.up("sm")]: {
      width: 380,
      minHeight: "50vh",
    },

    [theme.breakpoints.down(320)]: {
      padding: 0,
    },
  },
  avatarStyle: {
    backgroundColor: "#000",
  },
  inputBox: {
    margin: "0 auto",
    width: "100%",
    justifyContent: "center",
    "& .MuiGrid-item": {
      marginBottom: 20,
      marginRight: 10,
    },
  },
  buttonSubmit: {
    width: 200,
    margin: "0 auto",
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#000000d4",
    },
    "&:disabled": {
      backgroundColor: "#0000007a",
      color: "transparent",
    },
  },
  buttonSubmitSuccess: {
    width: 200,
    margin: "0 auto",
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 8,
    "&:disabled": {
      backgroundColor: "#0000007a",
      color: "transparent",
    },
  },
  buttonProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  gridItem: {
    marginBottom: 12,
  },
  Icon: {
    [theme.breakpoints.down(393)]: {
      display: "none",
    },
  },
  FormPadd: {
    padding: 20,
  },
});

class Login extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.state.username = false;
    this.state.usernameError = false;

    this.state.password = false;
    this.state.passwordError = false;

    this.state.loading = false;
  }
  handleValidation = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (!this.state.username)
      await this.setState({ usernameError: "Pole nie może pozostać puste" });
    if (!this.state.password)
      await this.setState({ passwordError: "Pole nie może pozostać puste" });

    if (!this.state.passwordError && !this.state.usernameError)
      await this.handleSubmit();

    return this.setState({ loading: false });
  };
  handleLogin = (e) => {
    this.setState({ passwordError: false });
    this.setState({ usernameError: false });

    this.setState({ username: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ passwordError: false });
    this.setState({ usernameError: false });

    this.setState({ password: e.target.value });
  };

  handleSubmit = async () => {
    await axios
      .post(
        `http://${window.location.hostname}:5000/signin`,
        {
          login: this.state.username,
          password: this.state.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.errors)
          return this.setState({
            passwordError: "Nieprawidłowy login lub hasło",
            usernameError: "Nieprawidłowy login lub hasło",
          });
        window.location = `/`;
      });
  };
  render() {
    const { userdata } = this.props;
    const { classes } = this.props;

    if (typeof userdata === "undefined") return null;

    if (!userdata) {
      return (
        <>
          <Head>
            <title>Logowanie - Naszechoinki.pl</title>
          </Head>

          <Layout>
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CssBaseline />

              <form
                noValidate
                autoComplete={"false"}
                onSubmit={(e) => this.handleValidation(e)}
              >
                <Grid className={classes.root}>
                  <Paper elevation={10} className={classes.paperStyle}>
                    <Grid style={{ display: " grid", justifyItems: "center" }}>
                      <Avatar className={classes.avatarStyle}>
                        <LockIcon />
                      </Avatar>
                      <h2>Zaloguj się</h2>
                    </Grid>
                    <div className={classes.inputBox}>
                      <Grid
                        container
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        <Grid item>
                          <AccountCircle className={classes.Icon} />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={10}>
                          <TextField
                            id={`loginform-login`}
                            error={this.state.usernameError ? true : false}
                            helperText={this.state.usernameError}
                            label="Nazwa użytkownika lub email"
                            fullWidth
                            onChange={(e) => {
                              this.handleLogin(e);
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        <Grid item>
                          <VpnKeyIcon className={classes.Icon} />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={10}>
                          <TextField
                            id={`loginform-password`}
                            type="password"
                            error={this.state.passwordError ? true : false}
                            helperText={this.state.passwordError}
                            label="Hasło"
                            fullWidth
                            onChange={(e) => {
                              this.handlePassword(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>

                    <FormControlLabel
                      className={classes.FormPadd}
                      control={
                        <Checkbox name="remember" color="primary" checked />
                      }
                      label="Zapamiętaj mnie"
                    />
                    <div className={classes.wrapper}>
                      <Button
                        type="submit"
                        variant="contained"
                        className={classes.buttonSubmit}
                        disabled={this.state.loading}
                        onClick={this.handleValidation}
                      >
                        Zaloguj
                      </Button>
                      {this.state.loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </Paper>
                </Grid>
              </form>
            </motion.div>
          </Layout>
        </>
      );
    }
    setTimeout(() => {
      this.props.router.push("/");
    }, 2000);
    return (
      <>
      <Head>
      <title>Trio | Zaloguj się</title>
    </Head>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CssBaseline />

          <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paperStyle}>
              <Grid style={{ display: " grid", justifyItems: "center" }}>
                <Avatar className={classes.avatarStyle}>
                  <LockIcon />
                </Avatar>
                <h2>Zaloguj się</h2>
              </Grid>
              <div className={classes.inputBox}>
                <h3 align="center" style={{}}>
                  Jesteś już zalogowany!
                </h3>
                <h3 align="center" style={{}}>
                  Zaraz nastąpi przekierowanie na stronę główną...
                </h3>
              </div>

              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.buttonSubmitSuccess}
                  disabled
                >
                  Zaloguj
                </Button>
                <CheckIcon className={classes.buttonProgress} />
              </div>
            </Paper>
          </Grid>
        </motion.div>
      </Layout>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Login));
