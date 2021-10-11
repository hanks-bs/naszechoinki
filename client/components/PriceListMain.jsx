/* eslint-disable react/no-unescaped-entities */
import dynamic from "next/dynamic";
const CssBaseline = dynamic(() => import("@material-ui/core/CssBaseline"), {
  ssr: false,
});
import Typography from "@material-ui/core/Typography";
const Container = dynamic(() => import("@material-ui/core/Container"));
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const Image = dynamic(() => import("next/image"), { ssr: true });
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import en from "./../lib/locales/en/en";
import en_pricelist from "./../lib/locales/en/pricelist";
import pl from "./../lib/locales/pl/pl";
import pl_pricelist from "./../lib/locales/pl/pricelist";
import { useRouter } from "next/router";
import { useState } from "react";
import axiosInstance from "./../lib/axios";
import PricelistsModal from "./PricelistsModal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
    position: "relative",
    margin: "50px 0",
    
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
    position: "relative",
    "&:not(:last-of-type)" : {
      "&::after": {
        content: "''",
        height: 1,
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
          },
        backgroundColor: "rgb(0 0 0 / 0.15)",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
  
    },
    },
    
    [theme.breakpoints.down("sm")]: {
      padding: "75px 15px",
    },
    padding: "75px 45px",
  },
  image: {
    [theme.breakpoints.down(400)]: {
      width: "100%",
    },
    boxShadow: "0px 0px 15px 1px #00000026",
    width: 330,
    height: 450,
    borderRadius: 55,
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  },
  pStyle: {
    color: "#505050",
    margin: "10px 0",
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
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#3e5411",
  },
  gridDescription: {

    [theme.breakpoints.up(840)]: {
        width: 400,
      },
      [theme.breakpoints.up(1128)]: {
        width: 600,
      },
    [theme.breakpoints.down(658)]: {
        padding: "20px 0",
      },
    padding: 20,
  },
  gridItemButton: {
    marginTop: 25,
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
      [theme.breakpoints.down(840)]: {
        flexDirection: "column-reverse",
      },
      padding: "8px 70px",
      borderRadius: 30,
    },
  },
  gridRow: {
    [theme.breakpoints.down(840)]: {
      flexDirection: "column-reverse",
    },
    alignItems: "center",
    justifyContent: "space-around",
  },
  edit: {
    [theme.breakpoints.down(840)]: {
      right: 15,
    },
    right: 27,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#688039",
      color: "#fff",
    },
  },
  delete: {
    [theme.breakpoints.down(840)]: {
      right: 50,
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
    top: -100,
    zIndex: 1,
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    position: "absolute",
    [theme.breakpoints.down(670)]: {
      top: 15,
    },
    "& > button": {
      minWidth: "auto",
    },
  },
}));

export default function PriceListMain(props) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_pricelist : en_pricelist;

  const userdata = props.userdata;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const handleDelete = async (e, id) => {
    const response = await axiosInstance.delete(`/api/pricelist_items/${id}`, {
      withCredentials: true,
    });
    if (response.data === true) return router.reload();
  };
 

  const scrollToContactSeedlings = async () => {
    await router.push('sadzonki');
    await document.querySelector('section#contact').scrollIntoView();
    }
    const handleEdit = async (e, id) => {
      const response = await axiosInstance.get(`/api/pricelist_items/${id}`);

      setData(response.data);
      setOpen(true);
    };

  return (
    <>
      <section className={classes.root} id={`about-us`}>
        <Container maxWidth={`lg`}>
        {userdata ? (
          <PricelistsModal data={data} open={open} setOpen={setOpen} />
        ) : null}
          <Box className={classes.orderBox}>
            <Button onClick={scrollToContactSeedlings}> {t.submit_order}</Button>
          </Box>

          <Typography variant="h1" component="h1">
            {t_spec.tree_pricelist}
          </Typography>
          <Typography
            component="p"
            className={classes.pStyle}
            style={{ marginTop: 40 }}
          >
            {t_spec.heading_desc}
          </Typography>
          <Box component="div" className={classes.BoxStyle}>
            <Grid container direction="column">
            {props.items.length ? (props.items.map((item) =>{
              return(
                <>
                
              <Grid item className={classes.gridItem} key={`item-${item.id}`}>
              
              <Grid container direction="row" className={classes.gridRow}>
                <Grid
                  item
                  className={classes.image}
                  style={{
                    backgroundImage:
                      `url(${item.image_link})`,
                  }}
                />

                <Grid item className={classes.gridDescription} style={{position: "relative"}}>
                {userdata ? (
                  <Box className={classes.controllers}>
                    <Button
                      className={classes.edit}
                      alt="Edytuj"
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      className={classes.delete}
                      alt="Usuń"
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                ) : null}
                  <Typography
                    className={classes.gridHeading}
                    component="h2"
                    variant="h5"
                  >
                    {locale === 'pl' ? item.title_pl : item.title_en}
                  </Typography>
                  <Typography component="p" className={classes.pStyle}>
                    <span style={{ fontWeight: 700, color: "#000" }}>
                      {t_spec.available_heights}:{" "}
                    </span>
                    {item.heights}
                  </Typography>
                  <Typography component="p" className={classes.pStyle}>
                    <span style={{ fontWeight: 700, color: "#000" }}>
                      {t_spec.description}:{" "}
                    </span>
                    {locale === 'pl' ? item.description_pl : item.description_en}

                  </Typography>
                  {item.additional_info_pl && item.additional_info_pl !== "undefined" && locale==='pl' ?  <Typography component="p" className={classes.pStyle}>
                  <span style={{ fontWeight: 700, color: "#000" }}>
                    {t_spec.add_info}:{" "}
                  </span>
                 { item.additional_info_pl }
                </Typography> : null}
                {item.additional_info_en && item.additional_info_en !== "undefined" && locale==='en' ?  <Typography component="p" className={classes.pStyle}>
                <span style={{ fontWeight: 700, color: "#000" }}>
                  {t_spec.add_info}:{" "}
                </span>
                {item.additional_info_en}
              </Typography> : null}
                </Grid>
              </Grid>
            </Grid></>
            )}) ) : null}

              
              </Grid>
          </Box>
          <Box className={classes.orderBox} style={{marginBottom: 45}}>
            <Button onClick={scrollToContactSeedlings}> {t.submit_order}</Button>
          </Box>
        </Container>
      </section>
    </>
  );
}
