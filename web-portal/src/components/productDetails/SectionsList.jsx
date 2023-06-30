import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { lecturesCalculator } from "utils/helpers/calculateLecturesOfCourse.helper";
import { lecturersTotalLength } from "utils/helpers/totalLengthCalculator.helper";

function SectionsList(props) {
  const { sections } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {sections.map((item) => (
        <Accordion
          key={item.uuid}
          expanded={expanded === item.name}
          onChange={handleChange(item.name)}
          className="border border-[#d1d7dc]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="!bg-[#f7f9fa] whitespace-nowrap"
          >
            <span className="leading-[1.2] text-[16px] font-[700]">
              {item.name}
            </span>
            <span className="w-full inline-block"> </span>
            <span className="text-[#1c1d1f] text-[14px] font-[400] leading-[1.4]">
              {item.lectures?.length} lectures -{" "}
              {`${Math.floor(
                lecturersTotalLength(item.lectures) / 3600,
              )}hr ${Math.floor(
                (lecturersTotalLength(item.lectures) % 3600) / 60,
              )}min`}
            </span>
          </AccordionSummary>
          <AccordionDetails>
            {item.lectures.map((item) => (
              <div key={item.uuid} className="py-[8px] flex flex-row">
                <span className="whitespace-nowrap">
                  <OndemandVideoIcon fontSize="14px" className="mr-[8px]" />{" "}
                  {item.preview === true ? (
                    <a
                      href={item.url}
                      className="text-[#5624d0] text-[14px] leading-[1.4] font-[400] underline whitespace-nowrap"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-[#1c1d1f] text-[14px] leading-[1.4] font-[400] whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </span>
                <span className="w-full inline-block"> </span>
                <span className="text-[#6a6f73] text-[14px] leading-[1.4] font-[400] inline-flex items-center gap-[32px]">
                  {item.preview && (
                    <span className="text-[#5624d0] text-[14px] leading-[1.4] font-[400] underline">
                      Preview
                    </span>
                  )}
                  {`${Math.floor(item.videoDuration / 60)}:${String(
                    item.videoDuration % 60,
                  ).padStart(2, "0")}`}
                </span>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default SectionsList;
