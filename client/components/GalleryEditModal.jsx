import { useRouter } from "next/router";
import { useState } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
const Image = dynamic(() => import("next/image"), { ssr: true });
import dynamic from "next/dynamic";
import axiosInstance from "./../lib/axios";

const useStyles = makeStyles((theme) => ({
    addButton: {
      position: "fixed",
      bottom: 15,
      right: 55,
      zIndex: 1,
      backgroundColor: "#303030",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#575555",
      },
    },
    editButton: { 
      position: "fixed",
    bottom: 85,
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
    paperEdit: {
      position: "relative",
      backgroundColor: "#fff",
      padding: "20px 20px 35px",
      width: "100%",
      margin: "20px auto",
      borderRadius: 12,
      [theme.breakpoints.up("sm")]: {
        width: 600,
        minHeight: "50vh",
      },
      [theme.breakpoints.up("md")]: {
        width: 850,
        minHeight: "50vh",
      },
      [theme.breakpoints.up("lg")]: {
        width: 1200,
        minHeight: "50vh",
      },
  
      [theme.breakpoints.down(320)]: {
        padding: "20px 10px 45px",
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

export default function GalleryEditModal(props, {open, setOpen, data}) {

    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;

    const [noDataError, setNoDataError] = useState(false);
    const [id, setId] = useState(false);
    const [title_pl, setTitle_pl] = useState(undefined);
    const [title_en, setTitle_en] = useState(undefined);
    const [width, setWidth] = useState(false);
    const [height, setHeight] = useState(false);

    const [image, setImage] = useState(undefined);
    const [imageError, setImageError] = useState(false);
    const [imagePreview, setImagePreview] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const max_size = 5242880; // 5 mb
    const [loading, setLoading] = useState(false);

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

    const handleClose = async () => {

        setTitle_pl(undefined);
    
        setTitle_en(undefined);
    
        setImage(undefined);
        setImageError(false);

        setWidth(false);

        setHeight(false);

        setProgress(0);
        setLoading(false);

        props.setOpen(false);
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            if(height) formData.append('height', height);
            if(id) formData.append('id', id);
            if(width) formData.append("width", width);
            if(title_pl) formData.append("title_pl", title_pl);
            if(title_en) formData.append("title_en", title_en);
            if(image) formData.append("image", image);
            setLoading(true);
            const response = await axiosInstance.put(`/api/gallery/${props.data.id}`,
            formData,
            {
              withCredentials: true,
              onUploadProgress: (data) => {
                //Set the progress value to show the progress bar
                console.log(progress);
                setProgress(Math.round((100 * data.loaded) / data.total));
              },
            });
            setLoading(false);
           if(response.data = true) router.reload();
        }
        catch(err) {
            console.log(err);
            return err;
        }
       


    }
    return(
        <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={props.open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    style={{ overflowY: "scroll" }}
  >
    <Fade in={props.open}>
      <Grid className={classes.paper}>
        <button className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </button>
        <h2 id="modal-title" className={classes.heading}>
          Edytuj
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
                  Id:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  type="number"
                  defaultValue={props.data && props.data.id ? props.data.id : null}
                  onChange={(e) => {
                    setNoDataError(false);
                    setId(e.target.value);
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
                  Nagłówek po polsku:
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  defaultValue={props.data && props.data.title_pl ? props.data.title_pl : null}
                  onChange={(e) => {
                    setNoDataError(false);
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
                  defaultValue={props.data && props.data.title_en ? props.data.title_en : null}
                  onChange={(e) => {
                    setNoDataError(false);
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
                  Wysokość (proporcje):
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  type="number"
                  defaultValue={props.data && props.data.height ? props.data.height : null}
                  onChange={(e) => {
                    setNoDataError(false);
                    setHeight(e.target.value);
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
                  Szerokość (proporcje):
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem} xs={8}>
                <CssTextField
                  id={`loginform-login`}
                  fullWidth
                  type="number"
                  defaultValue={props.data && props.data.width ? props.data.width : null}
                  onChange={(e) => {
                    setNoDataError(false);
                    setWidth(e.target.value);
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
                    setNoDataError(false);
                    setImageError(false);
                    handleChangeImage(e);
                  }}
                />
                <label htmlFor="modal-seedlings-image">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={loading}
                    
                  >
                    Dodaj
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
         
            <Button  disabled={loading} onClick={async (e) => {await handleSubmit()}}>Edytuj {loading && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}</Button>
        </Box>
        {!image && props.data &&  props.data.src ? `Nazwa: ${props.data.src.split("/")[3]}` : null }
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
        {noDataError ?  <div style={{ color: "#f44336", fontSize: "0.75rem", marginTop: 25 }}>
        {noDataError}
      </div>: null}
      </Grid>
    </Fade>
  </Modal>
    )
}