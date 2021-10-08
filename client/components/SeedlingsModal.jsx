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
import axiosInstance from "./../lib/axios";
import Cookies from "js-cookie";
import Validator from "validatorjs";
const Image = dynamic(() => import("next/image"), { ssr: true });
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";

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
export default function SeedlingsModal({ data, open, setOpen }) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_seedlings : en_seedlings;

  const max_size = 5242880; // 5 mb

  const [loading, setLoading] = useState(false);

  const [modalNoDataError, setModalNoDataError] = useState(false);

  const [modalEngName, setModalEngName] = useState(undefined);
  const [modalEngNameError, setModalEngNameError] = useState(false);

  const [modaPlName, setModalPlName] = useState(undefined);
  const [modaPlNameError, setModalPlNameError] = useState(false);

  const [modaPlOthers, setModalPlOthers] = useState(undefined);
  const [modaPlOthersError, setModalPlOthersError] = useState(false);

  const [modaEngOthers, setModalEngOthers] = useState(undefined);
  const [modaEngOthersError, setModalEngOthersError] = useState(false);

  const [modalAge, setModalAge] = useState(undefined);

  const [modalAgeError, setModalAgeError] = useState(false);

  const [modalEngPrice, setModalEngPrice] = useState(undefined);
  const [modalEngPriceError, setModalEngPriceError] = useState(false);

  const [modalPlPrice, setModalPlPrice] = useState(undefined);
  const [modalPlPriceError, setModalPlPriceError] = useState(false);

  const [currentFile, setCurrentFile] = useState(undefined);
  const [currentFileError, setCurrentFileError] = useState(false);

  const [previewImage, setPreviewImage] = useState(undefined);

  const [progress, setProgress] = useState(0);

  const [add, setAdd] = useState(false);
 

  const handleDelete = async (e, id) => {
    const response = await axiosInstance.delete(`/api/seedlings_items/${id}`, {
      withCredentials: true,
    });
    if (response.data !== true) return false;

    return router.reload();
  };

  const handleOpen = (e) => {
    setAdd(true);
    setOpen(true);
  };

  const handleClose = async () => {
    setModalEngName(undefined);
    setModalPlName(undefined);
    setModalPlOthers(undefined);
    setModalEngOthers(undefined);
    setModalAge(undefined);
    setModalEngPrice(undefined);
    setModalPlPrice(undefined);
    setCurrentFile(undefined);
    setPreviewImage(undefined);

    setModalEngNameError(false);
    setModalPlNameError(false);
    setModalPlOthersError(false);
    setModalEngOthersError(false);
    setModalAgeError(false);
    setModalEngPriceError(false);
    setModalPlPriceError(false);
    setCurrentFileError(false);
    setProgress(0);

    setOpen(false);
    setTimeout(() => {
      setAdd(false);
    }, 300);
  };
  const handleChangeImage = (e) => {
    setLoading(true);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentFile(file);
      const size = file.size;
    const type = ["image/png", "image/jpeg", "image/jpg"];
      if (type.indexOf(file.type) < 0) setCurrentFileError("Nieprawidłowe rozszerzenie");
      if (size > max_size) setCurrentFileError("Zdjęcie jest za duże. Maksymalny rozmiar zdjęcia to 5 mb.");
    setLoading(false);
      return setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    setCurrentFile(undefined);
    return setPreviewImage(undefined);
  };
  const submitEdit = async (e) => {
    const errors = {};
    setLoading(true);
    const formData = new FormData();
    e.preventDefault();
    
    const minLength = 3;
    const maxLength = 50;

    const validation = new Validator(
      {
        pl_name: modaPlName,
        eng_name: modalEngName,
        pl_others: modaPlOthers,
        eng_others: modaEngOthers,
      },
      {
        pl_name: `min:${minLength}|max:${maxLength}`,
        eng_name: `min:${minLength}|max:${maxLength}`,
        pl_others: `min:${minLength}|max:${maxLength}`,
        eng_others: `min:${minLength}|max:${maxLength}`,
      },
      {
        required: { string: "To pole jest wymagane" },
        min: { string: `Minimalna ilość znaków to: ${minLength}` },
        max: { string: `Maksymalna ilość znaków to: ${maxLength}` },
      }
    );

    validation.checkAsync(undefined, () => {
      return { errors: validation.errors.errors };
    });
    if (validation.passes() && !currentFileError) {
      //elements.image_link === currentFile.name ? undefined : formData.append("image", currentFile);

    data.title_pl === modaPlName || !modaPlName
    ? undefined
    : formData.append("pl_name", modaPlName);
  data.title_en === modalEngName || !modalEngName
    ? undefined
    : formData.append("eng_name", modalEngName);
  data.others_pl === modaPlOthers || !modaPlOthers
    ? undefined
    : formData.append("pl_others", modaPlOthers);
  data.others_en === modaEngOthers || !modaEngOthers
    ? undefined
    : formData.append("eng_others", modaEngOthers);
  data.age === modalAge || !modalAge
    ? undefined
    : formData.append("age", modalAge);
  data.price_pl === modalPlPrice || !modalPlPrice
    ? undefined
    : formData.append("pl_price", modalPlPrice);
  data.price_en === modalEngPrice || !modalEngPrice
    ? undefined
    : formData.append("eng_price", modalEngPrice);
  data.image_link === currentFile || !currentFile
    ? undefined
    : formData.append("image", currentFile);
    
   

    const response = await axiosInstance.put(
      `/api/seedlings_items/${data.id}`,
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
      (response.data.errors.plExists) ? setModalPlNameError("Taka nazwa jest już zajęta") : undefined;
      (response.data.errors.enExists) ? setModalEngNameError("Taka nazwa jest już zajęta") : undefined;
      (response.data.errors.noData) ? setModalNoDataError("Nic nie zmieniono") : undefined;


      }
      if(response.data === true) router.reload();
      return setLoading(false);
    }
    return setLoading(false);
  };

  const submitAdd = async (e) => {
    setLoading(true)
    const formData = new FormData();

    const minLength = 3;
    const maxLength = 30;
   
    const validation = new Validator(
      {
        pl_name: modaPlName,
        eng_name: modalEngName,
        pl_others: modaPlOthers,
        eng_others: modaEngOthers,
        age: modalAge,
        pl_price: modalPlPrice,
        eng_price: modalEngPrice,
        image: currentFile,
      },
      {
        pl_name: `required|min:${minLength}|max:${maxLength}`,
        eng_name: `required|min:${minLength}|max:${maxLength}`,
        pl_others: `max:50`,
        eng_others: `max:50`,
        age: `required`,
        pl_price: `required`,
        eng_price: `required`,
        image: `required`,
      },
      {
        required: { string: "To pole jest wymagane" },
        min: { string: `Minimalna ilość znaków to: :min` },
        max: { string: `Maksymalna ilość znaków to: :max` },
      }
    );
      validation.checkAsync(undefined, async () => {
      const { errors } = validation.errors;
      if(errors.pl_name) setModalPlNameError(errors.pl_name)
      errors.eng_name ? setModalEngNameError(errors.eng_name) : undefined;
      errors.age ? setModalAgeError(errors.age) : undefined;
      errors.pl_others ? setModalPlOthersError(errors.pl_others) : undefined;
      errors.eng_others ? setModalEngOthersError(errors.eng_others) : undefined;
      errors.eng_price ? setModalEngPriceError(errors.eng_price) : undefined;
      errors.pl_price ? setModalPlPriceError(errors.pl_price) : undefined;
      if(errors.image) {setCurrentFileError(errors.image)}
       

      
      return;
    });
    
    
    if (validation.passes() && !currentFileError) {
      formData.append("pl_name", modaPlName);
      formData.append("eng_name", modalEngName);
      formData.append("pl_others", modaPlOthers);
      formData.append("eng_others", modaEngOthers);
      formData.append("age", modalAge);
      formData.append("pl_price", modalPlPrice);
      formData.append("eng_price", modalEngPrice);
      formData.append("image", currentFile);

      const response = await axiosInstance.post(
        "/api/seedlings_items",
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
      (response.data.errors.plExists) ? setModalPlNameError("Taka nazwa jest już zajęta") : undefined;
      (response.data.errors.enExists) ? setModalEngNameError("Taka nazwa jest już zajęta") : undefined;

      }
      if(response.data === true) router.reload();
      return setLoading(false);
    }
    return setLoading(false);
  };

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
        style={{ overflowY: "scroll" }}
      >
        <Fade in={open}>
          <Grid className={classes.paper}>
            <button className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </button>
            <h2 id="modal-title" className={classes.heading}>
              {!add ? "Edycja" : "Dodaj"}
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
                      Nazwa po polsku:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      fullWidth
                      error={modaPlNameError ? true : false}
                      helperText={modaPlNameError}
                      defaultValue={!add ? data.title_pl : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalPlNameError(false);
                        setModalPlName(e.target.value);
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
                      Nazwa po angielsku:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      fullWidth
                      error={modalEngNameError ? true : false}
                      helperText={modalEngNameError}
                      defaultValue={!add ? data.title_en : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalEngNameError(false);
                        setModalEngName(e.target.value);
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
                      Wiek:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      fullWidth
                      error={modalAgeError ? true : false}
                      helperText={modalAgeError}
                      defaultValue={!add ? data.age : ""}
                      type="number"
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalAgeError(false);
                        setModalAge(e.target.value);
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
                      Inne po polsku:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      fullWidth
                      error={modaPlOthersError ? true : false}
                      helperText={modaPlOthersError}
                      defaultValue={!add ? data.others_pl : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalPlOthersError(false);
                        setModalPlOthers(e.target.value);
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
                      Inne po angielsku:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      fullWidth
                      error={modaEngOthersError ? true : false}
                      helperText={modaEngOthersError}
                      defaultValue={!add ? data.others_en : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalEngOthersError(false);
                        setModalEngOthers(e.target.value);
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
                      Cena w złotówkach:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      type="number"
                      fullWidth
                      error={modalPlPriceError ? true : false}
                      helperText={modalPlPriceError}
                      defaultValue={!add ? data.price_pl : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalPlPriceError(false);
                        setModalPlPrice(e.target.value);
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
                      Cena w dolarach:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <CssTextField
                      id={`loginform-login`}
                      type="number"
                      fullWidth
                      error={modalEngPriceError ? true : false}
                      helperText={modalEngPriceError}
                      defaultValue={!add ? data.price_en : ""}
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setModalEngPriceError(false);
                        setModalEngPrice(e.target.value);
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
                      Zdjęcie:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={8}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="modal-seedlings-image"
                      type="file"
                      onChange={(e) => {
                        setModalNoDataError(false);
                        setCurrentFileError(false);
                        handleChangeImage(e);
                      }}
                    />
                    <label htmlFor="modal-seedlings-image">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        {!add ? "Zmień" : "Dodaj"}
                      </Button>{" "}
                      {currentFileError ? (
                        <span style={{ color: "#f44336", fontSize: "0.75rem" }}>
                          {currentFileError}
                        </span>
                      ) : undefined}
                    </label>
                  </Grid>
                </Grid>
              </Box>
            </form>
            <Box className={classes.buttonsBox}>
              {!add ? (
                <Button  disabled={loading} onClick={(e) => submitEdit(e, data.id)}>Edytuj {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}</Button>
              ) : (
                <Button  disabled={loading} onClick={(e) => submitAdd(data.id)}>Dodaj {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}</Button>
              )}

              {!add && !loading ? <Button  disabled={loading} className={classes.delete} onClick={(e) => handleDelete(e, data.id)}>Usuń</Button> : null}
            </Box>
            {!add && !currentFile && data.image_link ? `Nazwa: ${data.image_link.split("/")[3]}` : null }
            {currentFile ? `Nazwa: ${currentFile.name}` : null}
            {previewImage && (
              <div>
                <div style={{ marginTop: 10 }}>Podgląd:</div>
                <Image
                  className="preview"
                  src={previewImage}
                  alt={currentFile.name}
                  width={200}
                  height={150}
                  objectFit="contain"
                />
              </div>
            )}
            {modalNoDataError ?  <div style={{ color: "#f44336", fontSize: "0.75rem", marginTop: 25 }}>
            {modalNoDataError}
          </div>: null}
          </Grid>
        </Fade>
      </Modal>
    </>
  );
}
