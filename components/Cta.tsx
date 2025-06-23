"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Fab from "@mui/material/Fab";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import CloseIcon from "@mui/icons-material/Close";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  CircularProgress,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { getClientDomainConfig } from "@/app/lib/domain-config";

const ErrorCard = ({ onRetry }: { onRetry: () => void }) => {
  const t = useTranslations("cta");
  return (
    <Card sx={{ maxWidth: 300 }} elevation={0}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ErrorOutlineIcon fontSize="large" />
      </Box>
      <CardContent>
        <Typography align="center">{t("errorMessage")}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={onRetry}>
          {t("retry")}
        </Button>
      </CardActions>
    </Card>
  );
};

const Cta = () => {
  const t = useTranslations("cta");
  const domainConfig = getClientDomainConfig();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleOpen = () => {
    setLoading(true);
    setIframeError(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleIframeLoad = () => setLoading(false);

  const handleIframeError = () => {
    setLoading(false);
    setIframeError(true);
  };

  const reload = () => {
    setLoading(true);
    setIframeError(false);

    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Box component="section">
        <Container className="flex flex-col justify-center items-center gap-8">
          <Fab
            color="primary"
            variant="extended"
            onClick={handleOpen}
            sx={{ mx: "auto", display: "block" }}
          >
            <BookmarkAdd sx={{ mr: 1 }} />
            {t("label")}
          </Fab>

          <div className="flex gap-8 text-xs text-left">
            <div className="flex flex-col sm:flex-row gap-2">
              <GppGoodIcon />
              <p>
                {t.rich("payment", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="flex flex-col sm:flex-row gap-2">
              <FingerprintIcon />
              <p>
                {t.rich("privacy", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <Divider orientation="vertical" flexItem />
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

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "90%", md: "80%" },
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton aria-label={t("close")} onClick={handleClose}>
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
          aria-busy={loading}
        >
          {loading && !iframeError && (
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
          {iframeError ? (
            <ErrorCard onRetry={reload} />
          ) : (
            <iframe
              ref={iframeRef}
              src={domainConfig.PAYMENT_URL}
              title={t("iframeTitle")}
              width="100%"
              height="100%"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              loading="lazy"
              style={{ visibility: loading ? "hidden" : "visible" }}
            />
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cta;
