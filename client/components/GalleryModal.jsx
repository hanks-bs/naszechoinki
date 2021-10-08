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



export default function GalleryModal (props) {
    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;

    const [title_pl, setTitle_pl] = useState(undefined);
    const [title_plError, setTitle_pl_error] = useState(false);

    const [title_en, setTitle_en] = useState(undefined);
    const [title_enError, setTitle_en_error] = useState(false);

    const [image, setImage] = useState(undefined);
    const [imageError, setImageError] = useState(false);

    const [height, setHeight] = useState(undefined);
    const [heightError, setHeightError] = useState(false);

    const [width, setWidth] = useState(undefined);
    const [widthError, setWidthError] = useState(false);

    const [imagePreview, setImagePreview] = useState(undefined);
    const [progress, setProgress] = useState(0);
  
    const max_size = 10485760; // 10 mb
    const [loading, setLoading] = useState(false);

    const handleClose = async () => {
        setTitle_pl(undefined);
        setTitle_pl_error(false);
    
        setTitle_en(undefined);
        setTitle_en_error(false);
    
        setDescription_pl(undefined);
        setDescription_pl_error(false);
    
        setDescription_en(undefined);
        setDescription_en_error(false);
    
        setImage(undefined);
        setImageError(false);

        setWidth(0);
        setWidthError(false);

        setHeight(0);
        setHeightError(false);

        setProgress(0);

        setOpen(false);
      }

    const handleChangeImage = (e) => {
        setLoading(true);
        if (e.target.files[0]) {
          const file = e.target.files[0];
          setImage(file);
          const size = file.size;
        const type = ["image/png", "image/jpeg", "image/jpg"];
          if (type.indexOf(file.type) < 0) setImageError("Nieprawidłowe rozszerzenie");
          if (size > max_size) setImageError("Zdjęcie jest za duże. Maksymalny rozmiar zdjęcia to 10 mb.");
        setLoading(false);
          return setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    
        setImage(undefined);
        
        return setImagePreview(undefined);
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
              {!add && !image && data.image_link ? `Nazwa: ${data.image_link.split("/")[3]}` : null }
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
    );
}