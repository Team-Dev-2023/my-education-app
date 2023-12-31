import { useRef, useState } from "react";
import KnowledgeCheckList from "./KnowledgeCheckList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CourseKnowledgeList(props) {
  const { courseKnowledgeList } = props;
  const divRef = useRef(null);
  const [toggleShowContent, setToggleShowContent] = useState(false);
  const divLength = divRef?.current?.clientHeight;

  return (
    <div className="border border-[d1d7dc] py-[24px] color-[#1c1d1f] max-w-[700px] mb-[32px]">
      <h2 className="mx-[24px] mb-[16px] font-[700] text-[24px]">
        What you'll learn
      </h2>
      <ul
        className={`mx-[24px] grid grid-cols-2 ${
          toggleShowContent
            ? "overflow-visible h-auto"
            : "overflow-hidden max-h-[215px]"
        }`}
        ref={divRef}
      >
        <KnowledgeCheckList courseKnowledgeList={courseKnowledgeList} />
      </ul>
      {divLength >= 221 && (
        <button
          className="mx-[24px] h-[40px] block"
          onClick={() => setToggleShowContent((prevState) => !prevState)}
        >
          {toggleShowContent ? (
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
  );
}

export default CourseKnowledgeList;
