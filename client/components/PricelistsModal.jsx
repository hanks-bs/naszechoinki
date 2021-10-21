import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import en from "./../lib/locales/en/en";
import en_pricelist from "./../lib/locales/en/pricelist";
import pl from "./../lib/locales/pl/pl";
import pl_pricelist from "./../lib/locales/pl/pricelist";
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


export default function PricelistsModal({ data, open, setOpen }) {
    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;
    const t = locale === "pl" ? pl : en;
    const t_spec = locale === "pl" ? pl_pricelist : en_pricelist;
  
    const max_size = 5242880; // 5 mb
  
    const [loading, setLoading] = useState(false);

  const [modalNoDataError, setModalNoDataError] = useState(false);

  const [title_pl, setTitle_pl] = useState(undefined);
  const [title_pl_error, setTitle_pl_error] = useState(false);

  const [title_en, setTitle_en] = useState(undefined);
  const [title_en_error, setTitle_en_error] = useState(false);

  const [heights, setHeights] = useState(undefined);
  const [heights_error, setHeights_error] = useState(false);

  const [description_pl, setDescription_pl] = useState(undefined);
  const [description_pl_error, setDescription_pl_error] = useState(false);

  const [description_en, setDescription_en] = useState(undefined);
  const [description_en_error, setDescription_en_error] = useState(false);

  const [additional_info_pl, setAdditional_info_pl] = useState(undefined);
  const [additional_info_pl_error, setAdditional_info_pl_error] = useState(false);

  const [additional_info_en, setAdditional_info_en] = useState(undefined);
  const [additional_info_en_error, setAdditional_info_en_error] = useState(false);

  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);

  const [imagePreview, setImagePreview] = useState(undefined);


  const [progress, setProgress] = useState(0);

  const [add, setAdd] = useState(false);

  const handleOpen = (e) => {
    setAdd(true);
    setOpen(true);
  };

  const submitAdd = async (e) => {
    setLoading(true)
    const formData = new FormData();


   
    const validation = new Validator(
      {
        title_pl: title_pl,
        title_en: title_en,
        description_pl: description_pl,
        description_en: description_en,
        heights: heights,
        image: image,
      },
      {
        title_pl: `required|min:3|max:50`,
        title_en: `required|min:3|max:50`,
        description_pl: `required|max:200`,
        description_en: `required|max:200`,
        heights: `required`,
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
      if(errors.title_pl) setTitle_pl_error(errors.title_pl)
      errors.title_en ? setTitle_en_error(errors.title_en) : undefined;
      errors.description_pl ? setDescription_pl_error(errors.description_pl) : undefined;
      errors.description_en ? setDescription_en_error(errors.description_en) : undefined;
      errors.heights ? setHeights_error(errors.heights) : undefined;
      if(errors.image) {setImageError(errors.image)}
       

      
      return;
    });
    
    
    if (validation.passes() && !imageError) {
      formData.append("title_pl", title_pl);
      formData.append("title_en", title_en);
      formData.append("description_pl", description_pl);
      formData.append("description_en", description_en);
      formData.append("additional_info_pl", additional_info_pl);
      formData.append("additional_info_en", additional_info_en); 
      formData.append("heights", heights);
      formData.append("image", image);

      const response = await axiosInstance.post(
        "/api/pricelist_items",
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

      }
      if(response.data === true) router.reload();
      return setLoading(false);
    }
  
    return setLoading(false);
  };

  const handleDelete = async (e, id) => {
    const response = await axiosInstance.delete(`/api/pricelist_items/${id}`, {
      withCredentials: true,
    });
    if (response.data === true) router.reload();

    const elem = e.target;
    console.log(elem)

  };

  const handleChangeImage = (e) => {
    setLoading(true);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const size = file.size;
    const type = ["image/png", "image/jpeg", "image/jpg"];
      if (type.indexOf(file.type) < 0) setImageError("Nieprawidłowe rozszerzenie");
      if (size > max_size) setImageError("Zdjęcie jest za duże. Maksymalny rozmiar zdjęcia to 5 mb.");
    setLoading(false);
      return setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    setImage(undefined);
    
    return setImagePreview(undefined);
  };
  
  const handleClose = async () => {
    setTitle_pl(undefined);
    setTitle_pl_error(false);

    setTitle_en(undefined);
    setTitle_en_error(false);

    setHeights(undefined);
    setHeights_error(false);

    setDescription_pl(undefined);
    setDescription_pl_error(false);

    setDescription_en(undefined);
    setDescription_en_error(false);

    setAdditional_info_pl(undefined);
    setAdditional_info_pl_error(false);

    setAdditional_info_en(undefined);
    setAdditional_info_en_error(false);

    setImage(undefined);
    setImageError(false);

    setProgress(0);

    
    setOpen(false);
    setTimeout(() => {
      setAdd(false);
    }, 300);
  }

  const submitEdit = async (e) => {
    const errors = {};
    setLoading(true);
    const formData = new FormData();
    e.preventDefault();
    
    const minLength = 3;
    const maxLength = 50;

    const validation = new Validator(
        {
            title_pl: title_pl,
            title_en: title_en,
            description_pl: description_pl,
            description_en: description_en,
            heights: heights,
            image: image,
          },
          {
            title_pl: `min:3|max:50`,
            title_en: `min:3|max:50`,
            description_pl: `max:200`,
            description_en: `max:200`,
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
    if (validation.passes() && !imageError) {
      //elements.image_link === currentFile.name ? undefined : formData.append("image", currentFile);

    data.title_pl === title_pl || !title_pl
    ? undefined
    : formData.append("title_pl", title_pl);
  data.title_en === title_en || !title_en
    ? undefined
    : formData.append("title_en", title_en);
  data.heights === heights || !heights
    ? undefined
    : formData.append("heights", heights);
  data.description_pl === description_pl || !description_pl
    ? undefined
    : formData.append("description_pl", description_pl);
  data.description_en === description_en || !description_en
    ? undefined
    : formData.append("description_en", description_en);
  data.additional_info_pl === additional_info_pl
    ? undefined
    : formData.append("additional_info_pl", additional_info_pl);
  data.additional_info_en === additional_info_en
    ? undefined
    : formData.append("additional_info_en", additional_info_en);
  data.image_link === imagePreview || !imagePreview
    ? undefined
    : formData.append("image", image);
    
   

    const response = await axiosInstance.put(
      `/api/pricelist_items/${data.id}`,
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
      (response.data.errors.noData) ? setModalNoDataError("Nic nie zmieniono") : undefined;


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
                        Nagłówek po polsku:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        error={title_pl_error ? true : false}
                        helperText={title_pl_error}
                        defaultValue={!add ? data.title_pl : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
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
                        defaultValue={!add ? data.title_en : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
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
                        Dostępne wysokości:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        error={heights_error ? true : false}
                        helperText={heights_error}
                        defaultValue={!add ? data.heights : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setHeights_error(false);
                          setHeights(e.target.value);
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
                        Opis po polsku:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        error={description_pl_error ? true : false}
                        helperText={description_pl_error}
                        defaultValue={!add ? data.description_pl : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setDescription_pl_error(false);
                          setDescription_pl(e.target.value);
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
                        Opis po angielsku:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        error={description_en_error ? true : false}
                        helperText={description_en_error}
                        defaultValue={!add ? data.description_en : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setDescription_en_error(false);
                          setDescription_en(e.target.value);
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
                        Dodatkowe informacje po polsku:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        type="text"
                        fullWidth
                        error={additional_info_pl_error ? true : false}
                        helperText={additional_info_pl_error}
                        defaultValue={!add && data.additional_info_pl !== "undefined" ? data.additional_info_pl : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setAdditional_info_pl_error(false);
                          setAdditional_info_pl(e.target.value);
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
                        Dodatkowe informacje po angielsku:
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        error={additional_info_en_error ? true : false}
                        helperText={additional_info_en_error}
                        defaultValue={!add && data.additional_info_en !== "undefined" ? data.additional_info_en : ""}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setAdditional_info_en_error(false);
                          setAdditional_info_en(e.target.value);
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
                          setImageError(false);
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
                        {imageError ? (
                          <span style={{ color: "#f44336", fontSize: "0.75rem" }}>
                            {imageError}
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
              {!add && !image && data.image_link ? `Nazwa: ${data.image_link.split("/")[4]}` : null }
              {image ? `Nazwa: ${image.name}` : null}
              {image && (
                <div>
                  <div style={{ marginTop: 10 }}>Podgląd:</div>
                  <Image
                    className="preview"
                    src={imagePreview}
                    alt={image.name}
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
    )
}