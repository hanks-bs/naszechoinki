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
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import axiosInstance from './../lib/axios';
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
    marginBottom: 30,
    fontSize: "2.5rem",
    color: "#3e5411",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    fontWeight: 500,
  },
  button: {
    marginLeft: 10,
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
  requiredinfo: {
    fontSize: ".8rem",
    color: "rgb(0 0 0 / 0.82)",
    marginTop: "25px",
  },
  buttonBox: {
    textAlign: "right",
  },
  linkHover: {
    "&:hover": {
      textDecoration: 'none'
    },
  },
  MallIcon: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    fontSize: "4rem",
    marginTop: -13,
    marginRight: 15
  },
}));

export default function SeedlingsContact() {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const [loading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);

  const [lastname, setLastname] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);

  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [phone, setPhone] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [company, setCompany] = useState(false);
  const [nip, setNIP] = useState(false);


  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [adress, setAdress] = useState(false);
  const [adressError, setAdressError] = useState(false);

  const [postCode, setPostCode] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);

  const [city, setCity] = useState(false);
  const [cityError, setCityError] = useState(false);

  const validateFirstName = async () => {
    setFirstnameError(false)
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

    validation.checkAsync(undefined, async () => {
         setFirstnameError(validation.errors.first("name"));
       return ;
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
    validation.checkAsync(undefined, async() => {
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
  const validatePhone = async () => {
    setPhoneError(false);

    const phone = document.querySelector("#phone").value;

    Validator.register(
      "telephone",
      function (value, requirement, attribute) {
        // requirement parameter defaults to null
        const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
        return phoneno.test(value);
      },
      t.invalid_format
    );

    const validation = new Validator(
      { telephone: phone },
      { telephone: "telephone|required" },
      {
        required: { string: t.required_err },
        telephone: { string: t.invalid_format },
      }
    );
    validation.checkAsync(undefined, async() => {
      return await setPhoneError(validation.errors.first("telephone"));
    });
  };
  const validateAdress = async () => {
    setAdressError(false);
    const adress = document.querySelector("#adress").value;
    const minLength = 3;
    const maxLength = 100;

    const validation = new Validator(
      { adress: adress },
      { adress: `min:${minLength}|max:${maxLength}|required` },
      {
        required: { string: t.required_err },
        min: { string: t.adress_tooshort },
        max: { string: t.adress_toolong },
      }
    );

    validation.checkAsync(undefined, () => {
      return setAdressError(validation.errors.first("adress"));
    });
  };
  const validatePostCode = async () => {
    setPostCodeError(false);

    const postcode = document.querySelector("#postcode").value;

    Validator.register(
      "postcode",
      function (value, requirement, attribute) {
        // requirement parameter defaults to null
        const postcode = /^\d{2}-\d{3}$/;
        return postcode.test(value);
      },
      t.invalid_format
    );

    const validation = new Validator(
      { postcode: postcode },
      { postcode: "postcode|required" },
      {
        required: { string: t.required_err },
        postcode: { string: t.invalid_format },
      }
    );
    validation.checkAsync(undefined, () => {
      return setPostCodeError(validation.errors.first("postcode"));
    });
  };
  const validateCity = async () => {
    setCityError(false);
    const city = document.querySelector("#city").value;
    const minLength = 3;
    const maxLength = 15;

    const validation = new Validator(
      { city: city },
      { city: `min:${minLength}|max:${maxLength}|required` },
      {
        required: { string: t.required_err },
        min: { string: t.city_tooshort },
        max: { string: t.city_toolong },
      }
    );

    validation.checkAsync(undefined, () => {
      return setCityError(validation.errors.first("city"));
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
    
    if (!firstnameError && !lastnameError && !emailError && !messageError && !phoneError && !adressError && !postCodeError && !cityError) {
      const formData = {};
      if(firstname) formData.firstname = firstname;
      if(lastname) formData.lastname = lastname;
      if(email) formData.email = email;
      if(phone) formData.phone = phone;
      if(company) formData.companyname=company;
      if(nip) formData.nip=nip;
      if(adress) formData.adress=adress
      if(postCode) formData.postcode=postCode;
      if(city) formData.city=city;
      if(message) formData.message=message;

      const response = await axiosInstance.post('/api/seedlings_items/contact', formData,  {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
      },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(Math.round((100 * data.loaded) / data.total));
        },
      });
      if(response.data===true) document.querySelector('form#contact').reset();
      return setLoading(false); //Jeśli serwer nie zwróci, to dopiero wtedy wyłączyć łądowanie buttona!!
    }
    return setLoading(false);
  };

  return (
    <>
      <section id="contact" className={classes.contact}>
        <Container maxWidth={`lg`} className={classes.container}>
          <Grid container className={classes.box}>
            <Grid item xs={12} className={classes.inner}>
              <Typography
                component="h2"
                variant="h2"
                className={classes.heading}
              >
              <LocalMallIcon className={classes.MallIcon} /> {t.submit_order}
              </Typography>
              <form
              id="contact"
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
                      onChange={async(e) => {setFirstname(e.target.value); await validateFirstName()}}
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
                      onChange={async(e) => {setLastname(e.target.value); await validateLastName()}}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="email"
                      label="Email"
                      error={emailError ? true : false}
                      helperText={emailError}
                      onChange={async(e) => {setEmail(e.target.value); await validateEmail();}}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="phone"
                      label={t.phone_number}
                      error={phoneError ? true : false}
                      helperText={phoneError}
                      onChange={async(e) => {setPhone(e.target.value); await validatePhone();}}
                      placeholder={`+48`}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="company"
                      label={t.company_name_label}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField fullWidth id="nip" label={t.nip_label} onChange={(e) => setNIP(e.target.value)}/>
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="adress"
                      label={t.adress}
                      error={adressError ? true : false}
                      helperText={adressError}
                      onChange={async(e) => {setAdress(e.target.value); await validateAdress();}}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="postcode"
                      label={t.post_code}
                      error={postCodeError ? true : false}
                      helperText={postCodeError}
                      onChange={async(e) => {setPostCode(e.target.value); await validatePostCode();}}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <CssTextField
                      fullWidth
                      id="city"
                      label={t.city}
                      error={cityError ? true : false}
                      helperText={cityError}
                      onChange={async(e) => {setCity(e.target.value); await validateCity();}}
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
                      onChange={async(e) => {setMessage(e.target.value); await validateMessage();}}
                      multiline
                      style={{ marginTop: 40 }}
                      required
                    />
                  </Grid>
                </Grid>
                <Typography component={"p"} className={classes.requiredinfo}>
                  * - {t.required_err}
                </Typography>
                <Box className={classes.buttonBox}>
                <Link href="tel:+48696443291" className={classes.linkHover}><Button style={{color: '#3e5411', backgroundColor: "transparent"}}>Zadzwoń</Button></Link>
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
                </Button></Box>
                
              </form>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
