import React from "react";

import UploadVideo from "./UploadVideo";
import DescriptionLecture from "./DescriptionLecture";

function ShowMoreLecture({
  isShowMoreContent,
  lecture,
  listSectionPut,
  setListSectionPut,
}) {
  return (
    <>
      {isShowMoreContent ? (
        <div className="p-4 border-t-[0.8px] border-black">
          <DescriptionLecture
            lecture={lecture}
            listSectionPut={listSectionPut}
            setListSectionPut={setListSectionPut}
          />
          <UploadVideo
            lecture={lecture}
            listSectionPut={listSectionPut}
            setListSectionPut={setListSectionPut}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ShowMoreLecture;
