import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
import axiosInstance from "./../lib/axios";
import Cookies from "js-cookie";
import Validator from "validatorjs";
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    },
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
      width: 500,
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
  buttonProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonsBox: {
    position: "absolute",
    bottom: 15,
    left: "-50%",
    transform: "translate(50%)",
    width: "100%",
    textAlign: "center",

    "& > Button": {
      "&:disabled": {
        "&:hover": {
          backgroundColor: "#1f1f1f52",
        },
        backgroundColor: "#1f1f1f52",
        color: "transparent",
      },
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
    display: "none",
  },
}));

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

export default function FilesModal({setOpen, open}) {
  const classes = useStyles();
  const router = useRouter();

  const max_size = 10485760; // 10 mb

  const [loading, setLoading] = useState(false);

  const [title_pl, setTitle_pl] = useState(undefined);
  const [title_pl_error, setTitle_pl_error] = useState(false);

  const [title_en, setTitle_en] = useState(undefined);
  const [title_en_error, setTitle_en_error] = useState(false);

  const [type, setType] = useState(undefined);
  const [typeError, setTypeError] = useState(undefined);

  const [file, setFile] = useState(undefined);
  const [fileError, setFileError] = useState(false);

  const [progress, setProgress] = useState(0);

  const handleChangeFile = (e) => {
    setLoading(true);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const size = file.size;
    const type = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
      if (type.indexOf(file.type) < 0) setFileError("Nieprawidłowe rozszerzenie");
      if (size > max_size) setFileError("Plik jest za duży. Maksymalny rozmiar pliku to 10 mb.");
    setLoading(false);
      return;
    }

    setImage(undefined);
    
    return setImagePreview(undefined);
  };

  const submitAdd = async (e) => {
    setLoading(true)
    const formData = new FormData();

    const validation = new Validator(
      {
        title_pl: title_pl,
        title_en: title_en,
        file: file,
      },
      {
        title_pl: `required|min:3|max:50`,
        title_en: `required|min:3|max:50`,
        file: `required`,
      },
      {
        required: { string: "To pole jest wymagane" },
        min: { string: `Minimalna ilość znaków to: :min` },
        max: { string: `Maksymalna ilość znaków to: :max` },
      }
    );
      validation.checkAsync(undefined, async () => {
      const { errors } = validation.errors;
      if(errors.title_pl) setTitle_pl_error(errors.title_pl)
      errors.title_en ? setTitle_en_error(errors.title_en) : undefined;
      if(errors.file) {setFileError(errors.file)}
      return;
    });
    
    
    if (validation.passes() && !fileError) {
      formData.append("title_pl", title_pl);
      formData.append("title_en", title_en);
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/api/files_download",
        formData,
        {
          withCredentials: true,
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            console.log(progress);
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      );
      if(response.data.errors){
      (response.data.errors.plExists) ? setTitle_pl_error("Taka nazwa jest już zajęta") : undefined;
      (response.data.errors.enExists) ? setTitle_en_error("Taka nazwa jest już zajęta") : undefined;
      (response.data.errors.typeError) ? setTypeError("Nieprawidłowe rozszerzenie") : undefined;

      }
      if(response.data === true) router.reload();
      return setLoading(false);
    }
  
    return setLoading(false);
  };


  const handleClose = async () => {
    setTitle_pl(undefined);
    setTitle_pl_error(false);

    setTitle_en(undefined);
    setTitle_en_error(false);

    setType(undefined);
    setTypeError(false);

    setProgress(0);

    
    setOpen(false);
  }

  return (
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
    style={{ overflowY: "scroll" }}
  >
    <Fade in={open}>
      <Grid className={classes.paper}>
        <button className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </button>
        <h2 id="modal-title" className={classes.heading}>
         Dodaj
        </h2>
        <form
          autoComplete="off"
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <Box className={classes.inputBox}>
            <Grid
              container
              alignItems="center"
              style={{ marginRight: 10, marginBottom: 20 }}
            >
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
                  Nagłówek po polsku:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  error={title_pl_error ? true : false}
                  helperText={title_pl_error}
                  onChange={(e) => {
                    setTitle_pl_error(false);
                    setTitle_pl(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              style={{ marginRight: 10, marginBottom: 20 }}
            >
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
                  Nagłówek po angielsku:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  error={title_en_error ? true : false}
                  helperText={title_en_error}
                  onChange={(e) => {
                    setTitle_en_error(false);
                    setTitle_en(e.target.value);
                  }}
                />
              </Grid>
            </Grid>


            <Grid
              container
              alignItems="center"
              style={{ marginRight: 10, marginBottom: 20 }}
            >
              <Grid item xs={3}>
                <Typography component={`p`} style={{ fontWeight: 700 }}>
                  Plik:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <input
                accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className={classes.input}
                  id="modal-seedlings-image"
                  type="file"
                  onChange={(e) => {
                    setFile(false);
                    setFileError(false);
                    handleChangeFile(e);
                  }}
                />
                <label htmlFor="modal-seedlings-image">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                  >
                   Dodaj
                  </Button>{" "}
                  {fileError ? (
                    <span style={{ color: "#f44336", fontSize: "0.75rem" }}>
                      {fileError}
                    </span>
                  ) : undefined}
                </label>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Box className={classes.buttonsBox}>
         
            <Button  disabled={loading} onClick={(e) => submitAdd()}>Dodaj {loading && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}</Button>
        </Box>
       
        {file ? `Nazwa: ${file.name}` : null}
        
      </Grid>
    </Fade>
  </Modal>
  );
}
