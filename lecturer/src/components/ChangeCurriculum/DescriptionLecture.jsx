import RichTextEditor from "components/RichTextEditor";
import RichTextEditorLecture from "components/RichTextEditorLecture";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "../../components/styles/RichTextEditorCss.css";
import { AiFillEdit } from "react-icons/ai";

function DescriptionLecture({ lecture, listSectionPut, setListSectionPut }) {
  const [description, setDescription] = useState("");
  const [isShowDescription, setIsShowDescription] = useState(false);
  let uuidLecture = lecture.uuid;

  const saveDescription = (value) => {
    let newListSectionPut = createNewListSectionPut(value);
    setListSectionPut(newListSectionPut);
  };

  function createNewListSectionPut(value) {
    let listSectionPutClone = JSON.parse(JSON.stringify(listSectionPut));
    if (listSectionPutClone) {
      for (const section of listSectionPutClone) {
        if (section.lectures) {
          const lecture = section.lectures.find((l) => l.uuid === uuidLecture);
          if (lecture) {
            lecture.description = value;
            break;
          }
        }
      }
    }

    return listSectionPutClone;
  }
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  return (
    <>
      {lecture.description && !isShowDescription ? (
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-6">
            <p className="font-[700]">Description:</p>
            <button onClick={() => setIsShowDescription(true)}>
              <AiFillEdit />
            </button>
          </div>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(lecture.description)}
          ></div>
        </div>
      ) : isShowDescription ? (
        <div>
          <p className="font-[700] mb-2">Description:</p>
          <RichTextEditor
            description={lecture.description}
            setDescription={setDescription}
          ></RichTextEditor>
          <div className="flex w-full justify-end gap-4 mt-2">
            <button
              className="border-[0.8px] border-black p-2"
              onClick={() => {
                setIsShowDescription(false);
              }}
            >
              Cancel
            </button>
            <button
              className="border-[0.8px] border-black p-2"
              onClick={() => {
                saveDescription(description);
                setIsShowDescription(false);
              }}
            >
              Save Description
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-fit p-2 border-[0.8px] border-black my-2"
          onClick={() => {
            setIsShowDescription(true);
          }}
        >
          + Description lecture
        </div>
      )}
    </>
  );
}

export default DescriptionLecture;
