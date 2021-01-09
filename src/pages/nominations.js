import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"

import { MovieInfo } from '../components';

const resultVariant = {
  hidden: {
    opacity: 0,
  },
  visible: i => ({
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: i * 0.125 + 0.125
    }
  })
}

const Nominations = ({ nominations, unNominate, isNominated }) => {
  return (
    <div>
      <AnimatePresence>
        {nominations.length !== 0 && (
          nominations.map((result, i) => {
            return (
              <motion.div
                key={'search_result_' + result.imdbID}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={resultVariant}
                layout
              >
                <MovieInfo
                  search={false}
                  movie={result}
                  key={"search_" + result.imdbID}
                  unNominate={unNominate}
                  isNominated={isNominated(result.imdbID)}
                />
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nominations;