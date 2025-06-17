"use client";

import { useTranslations } from "next-intl";
import { Alert, Box, Container, Link, Slide } from "@mui/material";
import { useLocale } from "@/hooks/useLocale";
import { memo } from "react";

const LocaleAlert = memo(function LocaleAlert() {
  const { isNonDefaultLocale, isLoading } = useLocale();
  const t = useTranslations("alert");

  // Don't render during loading to prevent flash
  if (isLoading) {
    return null;
  }

  return (
    <Slide direction="down" in={isNonDefaultLocale} timeout={300}>
      <Box
        component="div"
        bgcolor="warning.main"
        sx={{
          display: isNonDefaultLocale ? "block" : "none",
        }}
      >
        <Container maxWidth="lg">
          <Alert
            variant="filled"
            severity="warning"
            sx={{ borderRadius: 0, px: 0 }}
          >
            {t.rich("locale", {
              link: (chunks) => (
                <Link
                  href="https://receitascomshake.com.br"
                  sx={{
                    color: "inherit",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {chunks}
                </Link>
              ),
            })}
          </Alert>
        </Container>
      </Box>
    </Slide>
  );
});

export default LocaleAlert;
