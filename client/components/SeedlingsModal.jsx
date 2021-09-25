import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import en from "./../lib/locales/en/en";
import en_seedlings from "./../lib/locales/en/seedlings";
import pl from "./../lib/locales/pl/pl";
import pl_seedlings from "./../lib/locales/pl/seedlings";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axiosInstance from './../lib/axios';
import Cookies from "js-cookie";

const elements = 
  {
  id: 1,
  title_pl: "Jodła kaukaska",
  title_en: "Jodła kaukaska",
  age: 4,
  others_pl: "Lorem ipsum PL",
  others_en: "Lorem ipsum EN",
  price_pl: 250,
  price_en: 25,
  image_link: "123",

};



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
  addButton: {
    position: "fixed",
    bottom: 55,
    right: 55,
    zIndex: 1,
    backgroundColor: "#3e5411",
    color: "#fff",
    "&:hover": { 
    backgroundColor: "#687c3f",

    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px 20px 76px",
    width: "100%",
    margin: "20px auto",
    borderRadius: 12,
    [theme.breakpoints.up("sm")]: {
      width: 700,
      minHeight: "50vh",
    },

    [theme.breakpoints.down(320)]: {
      padding: 0,
    },
  },
  heading: {
    textAlign: "center",
  },
  closeButton: {
    color: "rgb(0 0 0 / 0.34)",
    border: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
    position: "absolute",
    right: 15,
    top: 15,
    "&:hover": {
      color: "rgb(0 0 0 / 0.73)",
    },
  },
  delete: {},
  buttonsBox: {
    position: "absolute",
    bottom: 15,
    left: "-50%",
    transform: "translate(50%)",
    width: "100%",
    textAlign: "center",

    "& > Button": {
      "&$delete": {
        backgroundColor: "#ff3636",
        "&:hover": { backgroundColor: "transparent", color: "#ff3636" },
      },
      marginLeft: 15,
      marginRight: 15,
      color: "#fff",
      width: 150,
      border: "none",
      margin: "0 auto",
      padding: 10,
      borderRadius: 25,
      backgroundColor: "#000",
      "&:hover": {
        color: "#000",
      },
    },
  },
  inputBox: {
    marginTop: "60px",
  },
  input: {
    display: 'none',
  },
}));
export default function SeedlingsModal({ data, open, setOpen }) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_seedlings : en_seedlings;

  const [modalEngName, setModalEngName] = useState(false);
  const [modaPlName, setModalPlName] = useState(false);
  const [modaPlOthers, setModalPlOthers] = useState(false);
  const [modaEngOthers, setModalEngOthers] = useState(false);
  const [modalAge, setModalAge] = useState(0);
  const [modalEngPrice, setModalEngPrice] = useState(0);
  const [modalPlPrice, setModalPlPrice] = useState(0);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  
  const [add, setAdd] = useState(false);
  
  const handleAdd = () => {
    return;
  }

  const handleOpen = (e) => {
    setAdd(true);
    setOpen(true);
  };

  const handleClose = async () => {
    setModalEngName(false);
    setModalPlName(false);
    setModalPlOthers(false);
    setModalEngOthers(false);
    setModalAge(0);
    setModalEngPrice(0);
    setModalPlPrice(0);
    setCurrentFile(undefined);
    setPreviewImage(undefined);
    setProgress(0);
    
    setOpen(false);
    setTimeout(() => {
      setAdd(false);
    }, 300);
  };
  const handleChangeImage = (e) => {
    setCurrentFile(e.target.files[0]);
   

    return  setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const submitHandler = async (e) => {
    const refreshToken = Cookies.get('jid');
    e.preventDefault() //prevent the form from submitting
    const formData = new FormData()
    //elements.image_link === currentFile.name ? undefined : formData.append("image", currentFile);
    data.title_pl === modaPlName || !modaPlName ? undefined : formData.append("pl_name", modaPlName);
    data.title_en === modalEngName || !modalEngName ? undefined :  formData.append("eng_name", modalEngName);
    data.others_pl === modaPlOthers || !modaPlOthers ? undefined : formData.append("pl_others", modaPlOthers);
    data.others_en === modaEngOthers || !modaEngOthers ? undefined :  formData.append("eng_others", modaEngOthers);
    data.age ===  modalAge || !modalAge ? undefined :  formData.append("age", modalAge);
    data.price_pl === modalPlPrice || !modalPlPrice ? undefined :  formData.append("pl_price", modalPlPrice);
    data.price_en === modalEngPrice || !modalEngPrice ? undefined : formData.append("eng_price", modalEngPrice);
    data.image_link === currentFile || !currentFile ? undefined : formData.append("image", currentFile);
    formData.append('token', refreshToken);
   

    const response = await axiosInstance.post("/api/seedlings_items",formData, {
      withCredentials: true,
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        console.log(progress)
        setProgress(Math.round((100 * data.loaded) / data.total))
      },
    })

    
  }

  

  return (
    <>
      <Fab
        className={classes.addButton}
        aria-label="Dodaj nowy element"
        onClick={(e) => handleOpen(e)}
        style={open ? { marginRight: 15 } : null}
      >
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid className={classes.paper}>
            <button className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </button>
            <h2 id="modal-title" className={classes.heading}>
              {!add ? "Edycja" : "Dodaj"}
            </h2>
            <Box className={classes.inputBox}>
              <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
                <Grid item xs={3}>
                  <Typography component={`p`} style={{ fontWeight: 700 }}>
                    Nazwa po polsku:
                  </Typography>
                </Grid>
                <Grid item className={classes.gridItem} xs={8}>
                  <CssTextField id={`loginform-login`} fullWidth defaultValue={!add ? data.title_pl : ""} onChange={(e) => {setModalPlName(e.target.value)}}/>
                </Grid>
              </Grid>
              <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
                <Grid item xs={3}>
                  <Typography component={`p`} style={{ fontWeight: 700 }}>
                    Nazwa po angielsku:
                  </Typography>
                </Grid>
                <Grid item className={classes.gridItem} xs={8}>
                  <CssTextField id={`loginform-login`} fullWidth defaultValue={!add ? data.title_en : ""} onChange={(e) => {setModalEngName(e.target.value)}}/>
                </Grid>
              </Grid>
              
              <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
                <Grid item xs={3}>
                  <Typography component={`p`} style={{ fontWeight: 700 }}>
                    Wiek:
                  </Typography>
                </Grid>
                <Grid item className={classes.gridItem} xs={8}>
                  <CssTextField id={`loginform-login`} fullWidth defaultValue={!add ? data.age : ""} type="number" onChange={(e) => {setModalAge(e.target.value)}}/>
                </Grid>
              </Grid>
              <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
                  Inne po polsku:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField id={`loginform-login`} fullWidth defaultValue={!add ? data.others_pl : ""}  onChange={(e) => {setModalPlOthers(e.target.value)}}/>
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
                  Inne po angielsku:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField id={`loginform-login`} fullWidth defaultValue={!add ? data.others_en : ""} onChange={(e) => {setModalEngOthers(e.target.value)}}/>
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
            <Grid item xs={3}>
              <Typography component={`p`} style={{ fontWeight: 700 }}>
                Cena w złotówkach:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem} xs={8}>
              <CssTextField id={`loginform-login`} type="number" fullWidth defaultValue={!add ? data.price_pl : ""} onChange={(e) => {setModalPlPrice(e.target.value)}}/>
            </Grid>
          </Grid>
          <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
            <Grid item xs={3}>
              <Typography component={`p`} style={{ fontWeight: 700 }}>
                Cena w dolarach:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem} xs={8}>
              <CssTextField id={`loginform-login`} type="number" fullWidth defaultValue={!add ? data.price_en : ""} onChange={(e) => {setModalEngPrice(e.target.value)}}/>
            </Grid>
          </Grid>
            <Grid container alignItems="center" style={{marginRight: 10, marginBottom: 20}}>
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
               Zdjęcie:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
              <input
              accept="image/*"
              className={classes.input}
              id="modal-seedlings-image"
              type="file"
              onChange={(e) => handleChangeImage(e)}
            />
            <label htmlFor="modal-seedlings-image">
              <Button variant="contained" color="primary" component="span">
              {!add ? "Zmień" : "Dodaj"}
              </Button>
            </label>
            
              </Grid>
            </Grid>
            

              

             
            </Box>

            <Box className={classes.buttonsBox}>
              <Button onClick={submitHandler}> {!add ? "Edycja" : "Dodaj"}</Button>
              {!add ? <Button className={classes.delete}>Usuń</Button> : null}
            </Box>
            {currentFile ? currentFile.name : null}
            {previewImage && (
              <div>
                <img className="preview" src={previewImage} alt="" />
              </div>
            )}
          </Grid>
        </Fade>
      </Modal>
    </>
  );
}
