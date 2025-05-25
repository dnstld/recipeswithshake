"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Fab from "@mui/material/Fab";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import CloseIcon from "@mui/icons-material/Close";
import GppGoodIcon from "@mui/icons-material/GppGood";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import {
  Box,
  Container,
  Modal,
  IconButton,
  CircularProgress,
} from "@mui/material";

const Cta = () => {
  const t = useTranslations("cta");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIframeLoad = () => setLoading(false);

  return (
    <>
      <Box component="section">
        <Container className="flex flex-col justify-center items-center gap-8">
          <Fab
            className="block mx-auto"
            color="primary"
            variant="extended"
            onClick={handleOpen}
          >
            <BookmarkAdd sx={{ mr: 1 }} />
            {t("label")}
          </Fab>

          <div className="flex gap-10 text-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <GppGoodIcon />
              <p>
                {t.rich("payment", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <FingerprintIcon />
              <p>
                {t.rich("privacy", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <ScreenLockPortraitIcon />
              <p>
                {t.rich("verified", {
                  br: () => <br />,
                })}
              </p>
            </div>
          </div>
        </Container>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal"
        aria-describedby="modal-containing-payment-page"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "80%", md: "70%" },
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              bgcolor: "primary.main",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <iframe
              src="https://sun.eduzz.com/G9617J3PW1"
              title="Payment Page"
              width="100%"
              height="100%"
              onLoad={handleIframeLoad}
              style={{ visibility: loading ? "hidden" : "visible" }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Cta;
