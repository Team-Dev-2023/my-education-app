import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DOMPurify from "dompurify";

function Description(props) {
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  const { courseData } = props;
  const divRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [divLength, setDivLength] = useState(divRef?.current?.clientHeight);
  useEffect(() => {
    setDivLength(divRef?.current?.clientHeight);
  }, []);

  return (
    <div className="mb-[32px] color-[#1c1d1f] max-w-[700px]">
      <h2 className="mb-[16px] font-[700] text-[24px]">Description</h2>
      <div className="container">
        <div
          className={`${
            expanded
              ? "overflow-visible h-auto"
              : "overflow-hidden max-h-[221px]"
          }`}
          ref={divRef}
        >
          <span
            className="text-[#1c1d1f] text-[14px] font-[400] leading-6"
            dangerouslySetInnerHTML={createMarkup(courseData.description)}
          ></span>
        </div>
        {divLength >= 221 && (
          <button
            className="h-[40px] block"
            onClick={() => setExpanded((prevState) => !prevState)}
          >
            {expanded ? (
              <span>
                <span className="mr-[4px] font-[700] text-[14px] text-[#5624d0]">
                  Show less
                </span>
                <KeyboardArrowUpIcon fontSize="small" color="#5624d0" />
              </span>
            ) : (
              <span>
                <span className="mr-[4px] font-[700] text-[14px] text-[#5624d0]">
                  Show more
                </span>
                <KeyboardArrowDownIcon fontSize="small" color="#5624d0" />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Description;
