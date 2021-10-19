import dynamic from "next/dynamic";
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {
  ssr: false,
});
import Typography from "@material-ui/core/Typography";
const Container = dynamic(() => import("@material-ui/core/Container"));
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import en from "./../lib/locales/en/en";
import en_seedlings from "./../lib/locales/en/seedlings";
import pl from "./../lib/locales/pl/pl";
import pl_seedlings from "./../lib/locales/pl/seedlings";
import { useRouter } from "next/router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SeedlingsModal from "./SeedlingsModal";
import { useState, useEffect } from "react";
import axiosInstance from "./../lib/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: "85px 15px 0 15px",
    },
    padding: "85px 30px 0 30px",
  },
  ContainerBox: {
    padding: 16,
    [theme.breakpoints.down(458)]: {
      textAlign: "center",
    },
  },
  BoxStyle: {
    margin: "50px 0",
    textAlign: "justify",
  },
  ImageBox: {
    float: "left",
    display: "block",
  },
  buttonStyle: {
    left: "100%",
    transform: "translateX(-100%)",

    [theme.breakpoints.down("xs")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  gridItem: {
    justifySelf: "center",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "0 15px",
    },
    padding: "0 45px",
    width: 335,
  },
  image: {
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    height: 210,
  },
  pStyle: {
    color: "#505050",
    fontSize: ".875rem",
    [theme.breakpoints.down(610)]: {
      fontSize: "0.8rem",
    },
  },
  heroGridContainer: {
    boxShadow: "0px 0px 15px 1px #00000026",

    borderRadius: 35,
    margin: "0 auto",
  },
  gridHeading: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#3e5411",
  },
  gridDescription: {
    padding: 20,
    position: "relative",
    alignItems: "baseline",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 250,
  },
  gridItemButton: {
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#3e5411",
      cursor: "default",
    },
  },
  orderBox: {
    textAlign: "center",
    marginBottom: 20,
    "& > button": {
      fontSize: "1.3rem",
      padding: "8px 70px",
      borderRadius: 30,
    },
  },
  edit: {
    position: "absolute",
    [theme.breakpoints.down(670)]: {
      left: 15,
    },
    left: -27,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#688039",
      color: "#fff",
    },
  },
  delete: {
    position: "absolute",
    [theme.breakpoints.down(670)]: {
      right: 15,
    },
    right: -27,
    backgroundColor: "#ff3636",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ff7b7b",
      color: "#fff",
    },
  },
  controllers: {
    position: "relative",
    [theme.breakpoints.down(670)]: {
      top: 15,
    },
    top: -20,
    "& > button": {
      minWidth: "auto",
      padding: 5,
    },
  },
  columns: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function SeedlingsMain(props) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_seedlings : en_seedlings;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const handleDelete = async (e, id) => {
    const response = await axiosInstance.delete(`/api/seedlings_items/${id}`, {
      withCredentials: true,
    });
    if (response.data !== true) return false;

    const elem = e.target;
    setInterval(function () {
      if (!elem.closest(".MuiGrid-item").style.opacity) {
        elem.closest(".MuiGrid-item").remove();
      }
      if (elem.closest(".MuiGrid-item").style.opacity > 0) {
        elem.closest(".MuiGrid-item").style.opacity -= 0.1;
      }
    }, 30);
    setTimeout(() => {
      elem.closest(".MuiGrid-item").remove();
    }, 310);
  };
  const handleEdit = async (e, id) => {
    const response = await axiosInstance.get(`/api/seedlings_items/${id}`);
    setData(response.data[0]);
    setOpen(true);
  };
  const userdata = props.userdata;
 
  

  return (
    <>
      <CssBaseline />

      <section className={classes.root} id={`about-us`}>
        <Container maxWidth={`lg`}>
          {userdata ? (
            <SeedlingsModal data={data} open={open} setOpen={setOpen} />
          ) : null}
          <Box className={classes.orderBox}>
            <Button
              onClick={async () => {
                document.querySelector("section#contact").scrollIntoView();
              }}
            >
              {" "}
              {t.submit_order}
            </Button>
          </Box>

          <Typography variant="h1" component="h1">
            {t.seedlings}
          </Typography>
          <Typography
            component="p"
            className={classes.pStyle}
            style={{ marginTop: 40 }}
            dangerouslySetInnerHTML={{__html: t_spec.heading_desc}}
          >
            
          </Typography>
          <Box component="div" className={classes.BoxStyle}>
            <Grid 
              container
              className={classes.columns}
              direction="row"
              justifyContent="space-around"
              spacing={6}
            >
            {props.items.length ? (
              props.items.map((elem) => {
                return (
                  <>
                    <Grid
                      item
                      className={classes.gridItem}
                      style={{ opacity: 1 }}
                      key={`item-${elem.id}`}
                    >
                      {userdata ? (
                        <Box className={classes.controllers}>
                          <Button
                            className={classes.edit}
                            alt="Edytuj"
                            onClick={(e) => {
                              handleEdit(e, elem.id);
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            className={classes.delete}
                            alt="Usuń"
                            onClick={(e) => {
                              handleDelete(e, elem.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      ) : null}

                      <Grid
                        container
                        direction="column"
                        className={classes.heroGridContainer}
                        style={{ overflow: "hidden", textAlign: "center" }}
                      >
                        <Grid item style={{ height: "100%", width: "100%" }}>
                          <Box
                            className={classes.image}
                            style={{
                              backgroundImage: `url(https://api.naszechoinki.pl/public${elem.image_link})`,
                            }}
                          />
                        </Grid>
                        <Grid item className={classes.gridDescription}>
                          <Typography
                            component="h2"
                            variant="h5"
                            className={classes.gridHeading}
                          >
                            {locale === "pl" ? elem.title_pl : elem.title_en}
                          </Typography>
                          <div>
                            <Typography
                              component="p"
                              className={classes.pStyle}
                              style={{ textAlign: "left" }}
                            >
                              <span style={{ fontWeight: 700, color: "#000" }}>
                                {t_spec.age}:
                              </span>{" "}
                              {elem.age}{" "}
                              {locale === "pl" ? "lat/a" : "year/s old"}
                            </Typography>
                            {elem.others_pl && elem.others_pl !== "undefined" && locale==='pl' ? <Typography
                              component="p"
                              className={classes.pStyle}
                              style={{ textAlign: "left", marginTop: 5 }}
                            >
                              <span style={{ fontWeight: 700, color: "#000" }}>
                                {t_spec.other}:{" "}
                              </span>{" "}
                             
                                {elem.others_pl}
                            </Typography> : null}
                            {elem.others_en && elem.others_en !== "undefined" && locale==='en' ? <Typography
                            component="p"
                            className={classes.pStyle}
                            style={{ textAlign: "left", marginTop: 5 }}
                          >
                            <span style={{ fontWeight: 700, color: "#000" }}>
                              {t_spec.other}:{" "}
                            </span>{" "}
                           
                              {elem.others_en}
                          </Typography> : null}
                            
                            
                          </div>
                          <Button
                            className={classes.gridItemButton}
                            disableTouchRipple
                          >
                            {t_spec.price}{" "}
                            {locale === "pl"
                              ? `${elem.price_pl} ${t_spec.price_sign}`
                              : `${t_spec.price_sign}${elem.price_en}`}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                );
              })
            ) : null}
            </Grid>
          </Box>
        </Container>
      </section>
    </>
  );
}

export default SeedlingsMain;
