import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"

const variant = {
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
      delay: 0.4,
    }
  },
};

const Nominations = ({ visible }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <motion.div
          layout
          key='nominations'
          variants={variant}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <h1>Nominations</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Nominations;