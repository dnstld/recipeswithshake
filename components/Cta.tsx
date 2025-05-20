"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Fab from "@mui/material/Fab";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const Cta = () => {
  const t = useTranslations("hero");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIframeLoad = () => setLoading(false);

  return (
    <>
      <section className="flex justify-center">
        <Fab
          className="block mx-auto"
          color="primary"
          variant="extended"
          onClick={handleOpen}
        >
          <BookmarkAdd sx={{ mr: 1 }} />
          {t("cta")}
        </Fab>
      </section>

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
