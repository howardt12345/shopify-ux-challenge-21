import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"

const rootVariant = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
      delay: 1,
    }
  },
};

const Nominations = ({ visible }) => {
  return (
    <>
      <h1>Nominations</h1>
    </>
  );
}

export default Nominations;