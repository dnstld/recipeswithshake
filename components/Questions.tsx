"use client";

import { useTranslations } from "next-intl";
import Accordion, {
  AccordionSlots,
  accordionClasses,
} from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";

const Questions = () => {
  const t = useTranslations("questions");

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <section>
      <div className="mx-auto max-w-full lg:max-w-7xl flex flex-col px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <h2 className="heading-2">{t("title")}</h2>
        <div className="text-left">
          <Accordion
            expanded={expanded}
            onChange={handleExpansion}
            slots={{ transition: Fade as AccordionSlots["transition"] }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[
              expanded
                ? {
                    [`& .${accordionClasses.region}`]: {
                      height: "auto",
                    },
                    [`& .${accordionDetailsClasses.root}`]: {
                      display: "block",
                    },
                  }
                : {
                    [`& .${accordionClasses.region}`]: {
                      height: 0,
                    },
                    [`& .${accordionDetailsClasses.root}`]: {
                      display: "none",
                    },
                  },
            ]}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" fontWeight="bold">
                {t("question-1.question")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("question-1.answer")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" fontWeight="bold">
                {t("question-2.question")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("question-2.answer")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span" fontWeight="bold">
                {t("question-3.question")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("question-3.answer")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography component="span" fontWeight="bold">
                {t("question-4.question")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("question-4.answer")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <Typography component="span" fontWeight="bold">
                {t("question-5.question")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("question-5.answer")}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Questions;
