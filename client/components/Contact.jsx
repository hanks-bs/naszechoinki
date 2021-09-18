import { useState } from "react";
import dynamic from "next/dynamic";
import en from "./../lib/locales/en/en";
import pl from "./../lib/locales/pl/pl";
import { useRouter } from "next/router";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
const Typography = dynamic(() => import("@material-ui/core/Typography"), {
  ssr: false,
});
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Validator from "validatorjs";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3e5411",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3e5411",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#3e5411",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  contact: {
    position: "relative",
    backgroundColor: "#fff",
  },
  contactContainer: {
    justifyContent: "space-around",
    marginTop: 95,
    "& > * > h3": {
      textAlign: "center",
      fontSize: "1.75rem",
      color: "#3e5411",
      marginBottom: 35,
    },
    "& span": {
      color: "#3e5411",
      fontWeight: 900,
      fontSize: "1.05rem",
    },
  },
  subcontainer: {
    "&:first-of-type": {
      [theme.breakpoints.down(663)]: {
        marginBottom: 30,
      },
    },
    color: "#191919",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "1rem",
  },
  container: {
    position: "relative",
    padding: "75px 30px",
  },
  box: {
    boxShadow: "0px 0px 20px 1px #00000040",
    borderRadius: 20,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  inner: {
    padding: 30,
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2.5rem",
    color: "#3e5411",
    textAlign: "center",
    fontWeight: 500,
  },
  button: {
    marginTop: 60,
    left: "100%",
    transform: "translateX(-100%)",
    "&:disabled": {
      "&:hover": {
        backgroundColor: "#1f1f1f52",
      },
      backgroundColor: "#1f1f1f52",
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
  Contacticon: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    fontSize: "4rem",
    marginTop: -10,
    marginRight: 15
  },
}));

export default function Contact() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const [loading, setLoading] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const validateFirstName = async () => {
    setFirstnameError(false);
    const firstname = document.querySelector("#firstname").value;
    const minLength = 3;
    const maxLength = 15;

    const validation = new Validator(
      { name: firstname },
      { name: `min:${minLength}|max:${maxLength}|required` },
      {
        required: { string: t.required_err },
        min: { string: t.firstname_tooshort },
        max: { string: t.firstname_toolong },
      }
    );

    validation.checkAsync(undefined, () => {
      return setFirstnameError(validation.errors.first("name"));
    });
  };

  const validateLastName = async () => {
    setLastnameError(false);
    const lastname = document.querySelector("#lastname").value;
    const minLength = 3;
    const maxLength = 20;

    const validation = new Validator(
      { lastname: lastname },
      { lastname: `min:${minLength}|max:${maxLength}|required` },
      {
        required: { string: t.required_err },
        min: { string: t.lastname_tooshort },
        max: { string: t.lastname_toolong },
      }
    );
    validation.checkAsync(undefined, () => {
      return setLastnameError(validation.errors.first("lastname"));
    });
  };
  const validateEmail = async () => {
    setEmailError(false);

    const email = document.querySelector("#email").value;
    const validation = new Validator(
      { email: email },
      { email: "required|email" },
      {
        required: { string: t.required_err },
        email: { string: t.invalid_format },
      }
    );
    validation.checkAsync(undefined, () => {
      return setEmailError(validation.errors.first("email"));
    });
  };

  const validateMessage = async () => {
    setMessageError(false);

    const message = document.querySelector("#message").value;
    const minLength = 20;
    const maxLength = 500;

    const validation = new Validator(
      { message: message },
      { message: `min:${minLength}|max:${maxLength}|required` },
      {
        required: { string: t.required_err },
        min: { string: t.message_tooshort },
        max: { string: t.message_toolong },
      }
    );

    validation.checkAsync(undefined, () => {
      return setMessageError(validation.errors.first("message"));
    });
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    setLoading(true);

    await validateFirstName();
    await validateLastName();
    await validateEmail();
    await validateMessage();

    if (!firstnameError && !lastnameError && !emailError && !messageError) {
      return setLoading(false);//Jeśli serwer nie zwróci, to dopiero wtedy wyłączyć łądowanie buttona!!
    }
    return setLoading(false)
  };

  return (
    <>
      <section id="contact" className={classes.contact}>
        <Container maxWidth={`lg`} className={classes.container}>
          <Grid container className={classes.box}>
            <Grid item xs={12} sm={6}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d81312.20213901027!2d20.909186!3d50.440983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8f75e606863db0ed!2sSzk%C3%B3%C5%82ka%20drzew%20i%20krzew%C3%B3w%20ozdobnych.%20Hurtownia%20choinek.!5e0!3m2!1sen!2sus!4v1630862949923!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title="Mapa"
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.inner}>
              <Typography
                component="h2"
                variant="h2"
                className={classes.heading}
              >
                  <ContactSupportIcon className={classes.Contacticon} /> {t.contact}
              </Typography>
              <form
                autoComplete="off"
                noValidate
                onSubmit={(e) => handleValidation(e)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="firstname"
                      error={firstnameError ? true : false}
                      helperText={firstnameError}
                      label={t.firstname}
                      onChange={() => setFirstnameError(false)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="lastname"
                      inputProps={{ maxLength: 500, minLength: 50 }}
                      error={lastnameError ? true : false}
                      helperText={lastnameError}
                      label={t.lastname}
                      onChange={() => setLastnameError(false)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="email"
                      label="Email"
                      error={emailError ? true : false}
                      helperText={emailError}
                      onChange={() => setEmailError(false)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="message"
                      label={t.mess_content}
                      error={messageError ? true : false}
                      helperText={messageError}
                      onChange={() => setMessageError(false)}
                      multiline
                      style={{ marginTop: 40 }}
                      required
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  type="submit"
                  disabled={loading}
                  onClick={handleValidation}
                >
                  {t.send}
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid container className={classes.contactContainer}>
            <Grid item>
              <Typography component="h3" variant="h3">
                {t.trees}
              </Typography>
              <Grid
                container
                direction="column"
                className={classes.subcontainer}
              >
                <Grid item>
                  <span>Tel.: </span>604 771 938
                </Grid>
                <Grid item>
                  <span>Email: </span>mieczyslaw.bednarz@wp.pl
                </Grid>
                <Grid item>
                  <span>{t.adress}: </span>
                </Grid>
                <Grid item>Suchowola 65a</Grid>
                <Grid item>28-130 Stopnica</Grid>
                <Grid item>woj. świętokrzyskie</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography component="h3" variant="h3">
                {t.plant_nursery}
              </Typography>
              <Grid
                container
                direction="column"
                className={classes.subcontainer}
              >
                <Grid item>
                  <span>Tel.: </span>696 443 291
                </Grid>
                <Grid item>
                  <span>Email: </span>bednarz.patrycja.91@gmail.com
                </Grid>
                <Grid item>
                  <span>{t.adress}: </span>
                </Grid>
                <Grid item>Wolica 124</Grid>
                <Grid item>28-130 Stopnica</Grid>
                <Grid item>woj. świętokrzyskie</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
