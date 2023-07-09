import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Accordion from "@mui/material/Accordion";
import Modal from "@mui/material/Modal";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { lecturersTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import { filterPreviewLectures } from "utils/helpers/filterPreviewLectures.helper";

function SectionsList(props) {
  const { sections, title, image } = props;
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [urlForPlayer, setUrlForPlayer] = useState("");

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleVideoPlay = (event) => {
    const url = event.currentTarget.getAttribute("url");
    setUrlForPlayer(url);
  };

  useEffect(() => {
    const filterList = filterPreviewLectures(sections);
    setPreviewList([...filterList]);
  }, []);

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
            className="!bg-[#f7f9fa] overflow-hidden whitespace-nowrap text-ellipsis"
          >
            <span className="mr-auto w-[400px] leading-[1.2] text-[16px] font-[700] overflow-hidden whitespace-nowrap text-ellipsis">
              {item.name}
            </span>
            <span className="text-[#1c1d1f] text-[14px] font-[400] leading-[1.4]">
              {item.lectures?.length} lectures -{" "}
              {lecturersTotalLength(item.lectures)}
            </span>
          </AccordionSummary>
          <AccordionDetails>
            {item.lectures.map((item) => (
              <div key={item.uuid} className="py-[8px] flex flex-row">
                <span className="whitespace-nowrap">
                  <OndemandVideoIcon fontSize="14px" className="mr-[8px]" />{" "}
                  {item.preview === true ? (
                    <span
                      onClick={handleOpenModal}
                      className="text-[#5624d0] text-[14px] leading-[1.4] font-[400] underline whitespace-nowrap cursor-pointer"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <span className="text-[#1c1d1f] text-[14px] leading-[1.4] font-[400] whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </span>
                <span className="w-full inline-block"> </span>
                <span className="text-[#6a6f73] text-[14px] leading-[1.4] font-[400] inline-flex items-center gap-[32px]">
                  {item.preview && (
                    <span
                      onClick={handleOpenModal}
                      className="text-[#5624d0] text-[14px] leading-[1.4] font-[400] underline cursor-pointer"
                    >
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
      <Modal open={open} onClose={handleCloseModal} className="overflow-scroll">
        <div className="flex flex-col justify-center my-[10vh] max-w-[600px] mx-auto">
          <div className="w-full px-[24px] pt-[36px] bg-[#1c1d1f] text-white block ">
            <div className="h-full block pb-[8px] text-[14px] font-[700] leading-[1.2]">
              <p className="block pb-[8px] text-[14px] font-[700] leading-[1.2]">
                Course Preview
              </p>
              <p className="text-[19px]">{title}</p>
            </div>
            <div className="w-full h-full">
              <ReactPlayer url={urlForPlayer} width="552px" />
            </div>
            <div className="w-full text-[19px] font-[700] leading-[1.2] py-[16px]">
              <span>Free Sample Videos:</span>
            </div>
          </div>
          <div className="flex flex-col pb-[36px] bg-[#1c1d1f] text-white w-full">
            {previewList &&
              previewList.map((item) => (
                <button
                  onClick={handleVideoPlay}
                  url={item.url}
                  key={item.uuid}
                  className="f-full flex flex-row justify-start items-center gap-2 text-white cursor-pointer px-[24px] h-[69px] bg-transparent focus:bg-[#3e4143]"
                >
                  <div className="h-[36px] w-[64px]">
                    <img src={image} alt="videoThumbnail" />
                  </div>
                  <PlayCircleFilledWhiteIcon
                    className="w-[64px] h-[64px] !text-[20px]"
                    fontSize="inherit"
                  />
                  <p className="h-full w-full text-left flex items-center justify-between text-[14px] font-[700] leading-[1.2]">
                    <span className="whitespace-nowrap mr-auto max-w-[400px] overflow-hidden text-ellipsis">
                      {item.name}
                    </span>
                    <span className="text-[12px]">{item.duration}</span>
                  </p>
                </button>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SectionsList;
