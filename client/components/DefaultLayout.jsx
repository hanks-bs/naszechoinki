import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./Navbar"));
import { motion } from "framer-motion";
const Footer = dynamic(() => import("./Footer"));
const Header = dynamic(() => import("./Header"));
import Infobar from "./Infobar";
import React from 'react'
export default function Layout({ children, userdata }) {


  return (
    <>
    <Infobar />
      {/*<Navbar userdata={userdata} />*/}
      <Header />
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <main>{children}</main>
      </motion.div>
      <Footer/>
    </>
  );
}
