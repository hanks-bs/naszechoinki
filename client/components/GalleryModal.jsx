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
import axiosInstance from "./../lib/axios";
import Validator from "validatorjs";
const Image = dynamic(() => import("next/image"), { ssr: true });
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from  'clsx';
import GalleryEditModal from './GalleryEditModal';

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
    modalEditBtn: {},
    modalDeleteBtn: {},
    modalBtns: {
      backgroundColor: 'transparent',
      padding: "5px 10px",
     
      "&$modalEditBtn": {
        color: "#3e5411",
      },
      "&$modalDeleteBtn": {
        color: "red",
      }
    }
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

export default function GalleryModal ({data}) {
    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;


    const [modalNoDataError, setModalNoDataError] = useState(false);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [openEditSingle, setOpenEditSingle] = useState(false);
    const [dataPass, setDataPass] = useState({});

    const [title_pl, setTitle_pl] = useState(undefined);
    const [title_pl_error, setTitle_pl_error] = useState(false);

    const [title_en, setTitle_en] = useState(undefined);
    const [title_en_error, setTitle_en_error] = useState(false);

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

    const handleCloseAdd = async () => {
        setTitle_pl(undefined);
        setTitle_pl_error(false);
    
        setTitle_en(undefined);
        setTitle_en_error(false);
    
        setImage(undefined);
        setImageError(false);

        setWidth(0);
        setWidthError(false);

        setHeight(0);
        setHeightError(false);

        setLoading(false);
        setProgress(0);

        setOpenAdd(false);
      }

    const handleCloseEdit = async () => {
        setTitle_pl(undefined);
        setTitle_pl_error(false);

        setOpenEditSingle(false);
        setDataPass({});
    
        setTitle_en(undefined);
        setTitle_en_error(false);
    
        setImage(undefined);
        setImageError(false);

        setWidth(0);
        setWidthError(false);

        setHeight(0);
        setHeightError(false);

        setProgress(0);

        setOpenEdit(false);
      }

      const handleOpenEdit = async () => {
        setOpenEdit(true)
      }
      const handleOpenAdd = async () => {
        setOpenAdd(true);
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
      const handleDelete = async id => {
        const response = await axiosInstance.delete(`/api/gallery/${id}`, {
          withCredentials: true,
        });
        if (response.data === true) return router.reload();
      }

    const passData = async (id) => {
      const data = await axiosInstance.get(`/api/gallery/${id}`);
      setDataPass(data.data);
     
    }

    const submitAdd = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        if(!image) {setImageError("To pole jest wymagane"); return setLoading(false);}
        if(title_pl) formData.append("title_pl", title_pl);
        if(title_en) formData.append("title_en", title_en);
        if(width) formData.append("width", width);
        if(height) formData.append('height', height);
        
        console.log(title_pl, title_en, width, height)
        
        formData.append("image", image);
        const response = await axiosInstance.post(`/api/gallery/`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
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


    return (
        <>
        <GalleryEditModal open={openEditSingle} setOpen={setOpenEditSingle} data={dataPass}/>
        <Fab
          className={classes.addButton}
          aria-label="Edytuj Galerię"
          onClick={(e) => handleOpenAdd(e)}
          style={ openAdd || openEdit ? { marginRight: 15 } : null}
        >
          <AddIcon />
        </Fab>
        <Fab
          className={classes.editButton}
          aria-label="Dodaj nowy element"
          onClick={(e) => handleOpenEdit(e)}
          style={ openAdd || openEdit ? { marginRight: 15 } : null}
        >
          <EditIcon />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{ overflowY: "scroll" }}
        >
          <Fade in={openAdd}>
            <Grid className={classes.paper}>
              <button className={classes.closeButton} onClick={handleCloseAdd}>
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
                        Wysokość (proporcje):
                      </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={8}>
                      <CssTextField
                        id={`loginform-login`}
                        fullWidth
                        type="number"
                        error={heightError ? true : false}
                        helperText={heightError}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setHeightError(false);
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
                        error={widthError ? true : false}
                        helperText={widthError}
                        onChange={(e) => {
                          setModalNoDataError(false);
                          setWidthError(false);
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
               
                  <Button  disabled={loading} onClick={(e) => submitAdd()}>Dodaj {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}</Button>
              </Box>
              {!image && data.src ? `Nazwa: ${data.src.split("/")[4]}` : null }
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
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ overflowY: "scroll" }}
      >
        <Fade in={openEdit}>
          <Grid className={classes.paperEdit}>
            <button className={classes.closeButton} onClick={handleCloseEdit}>
              <CloseIcon />
            </button>
            <h2 id="modal-title" className={classes.heading}>
              Lista zdjęć
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
                
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Lista zdjęć">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Nagłówek PL</TableCell>
            <TableCell align="left">Nagłówek EN</TableCell>
            <TableCell align="left">Miniaturka</TableCell>
            <TableCell align="right">Opcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.title_pl}</TableCell>
              <TableCell align="left">{item.title_en}</TableCell>
              <TableCell align="left"><Image src={`https://api.naszechoinki.pl/public${item.src}`} objectFit="contain" quality="75%" alt={item.title} width={100} height={50}/></TableCell>
              <TableCell align="right"><Button onClick={async () => {await passData(item.id); await setOpenEditSingle(true)}}  className={clsx(classes.modalBtns,classes.modalEditBtn)}>EDYTUJ</Button> | <Button className={clsx(classes.modalBtns,classes.modalDeleteBtn)} onClick={async () => await handleDelete(item.id)}>USUŃ</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


                </Grid>
              </Box>
            </form>
            
            {!image && data.src ? `Nazwa: ${data.src.split("/")[4]}` : null }
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