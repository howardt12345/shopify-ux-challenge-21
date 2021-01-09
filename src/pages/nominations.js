import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { Share } from '@styled-icons/material';
import { Link, Copy } from '@styled-icons/boxicons-regular';
import { useSnackbar } from 'react-simple-snackbar'

import { IconButton, MovieInfo } from '../components';
import { media, snackbarOptions } from '../styles';

const ShareContainer = styled.div`
  height: 48px;
  padding: 1em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 500px;
  ${media.tablet`width: 75vw`};
`;
const StyledLinkInput = styled(motion.input)`
  padding: 1em 1em;
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
`;

const buttonVariant = {
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    }
  }
}
const resultVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: i * 0.125 + 0.5
    }
  }),
  exit: {
    opacity: 0,
    y: -10,
  }
}
const linkVariant = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: '100%',
    transition: {
      ease: "easeOut",
      duration: 0.5,
    }
  }
}

const Nominations = ({ nominations, unNominate, isNominated }) => {
  const [link, setLink] = useState('');
  const linkRef = useRef(null);
  const [openSnackbar] = useSnackbar(snackbarOptions);

  const generateLink = async () => {
    if (nominations.length !== 0) {
      await axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`, {
        dynamicLinkInfo: {
          domainUriPrefix: "https://shopux21.ht12345.xyz/share",
          link: `${window.location.origin}/?n[]=${nominations.map(n => n.imdbID).join('&n[]=')}`
        }
      }).then((response) => {
        setLink(response.data.shortLink);
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

  const copy = (e) => {
    linkRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    openSnackbar("Successfully copied!");
  }

  return (
    <div>
      <AnimatePresence>
        <ShareContainer>
          {link.length === 0 && nominations.length !== 0 && (
            <IconButton
              key="nominations_share"
              onClick={generateLink}
              title="Generate shareable link"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariant}
              layout
            >
              <Link />
            </IconButton>
          )}
          {link.length !== 0 && (
            <>
              <StyledLinkInput
                key="nominations_link"
                type='text'
                readonly
                value={link}
                ref={linkRef}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={linkVariant}
              />
              <IconButton
                key="nominations_copy"
                onClick={copy}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={buttonVariant}
              >
                <Copy />
              </IconButton>
              {navigator.share && (<IconButton
                key="nominations_share"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      url: link,
                    }).then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
                  } else {
                    console.log("Web Share API is not supported in your browser.")
                  }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={buttonVariant}
              >
                <Share />
              </IconButton>)}
            </>
          )}
        </ShareContainer>
        {nominations.length !== 0 && (
          nominations.map((result, i) => {
            return (
              <motion.div
                key={'search_result_' + result.imdbID}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={resultVariant}
                layout
              >
                <MovieInfo
                  search={false}
                  movie={result}
                  key={"search_" + result.imdbID}
                  unNominate={(movie) => {
                    unNominate(movie);
                    setLink('');
                  }}
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