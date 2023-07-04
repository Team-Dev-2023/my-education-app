import React, { useState } from "react";
import { AiFillCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

function TitleSection({
  position,
  section,
  sectionEdit,
  setSectionEdit,
  listSectionEdit,
  setListSectionEdit,
  setListSectionPut,
  listSectionPut,
}) {
  const [isEditTitleSection, setIsEditTitleSection] = useState(false);
  function updateNameSectionInListSection(e) {
    const updatedArray = listSectionEdit.map((item) => {
      if (item.uuid === section.uuid) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setSectionEdit({ ...sectionEdit, name: e.target.value });
    setListSectionEdit(updatedArray);
  }
  const saveEditSection = (e) => {
    e.preventDefault();
    setListSectionPut(listSectionEdit);
    setIsEditTitleSection(false);
  };

  const deleteSection = (uuid) => {
    let newArrayDeletedSection = listSectionPut.filter(
      (item) => item.uuid !== uuid
    );
    setListSectionPut(newArrayDeletedSection);
  };
  return (
    <>
      {isEditTitleSection ? (
        <div className="Edit title">
          <div>
            <div>
              <form
                form={"editSectionForm"}
                onSubmit={(e, value) => saveEditSection(e, value)}
                action=""
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex gap-2">
                  <div className="mt-2 flex gap-2 ">
                    <AiFillCheckCircle />
                    Section: {position}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="name"
                      required
                      value={sectionEdit.name}
                      onChange={(e) => updateNameSectionInListSection(e)}
                      placeholder="Enter a Title"
                      className="p-2 w-full border-[0.8px] border-black"
                    />
                    <h4 className="mt-4">
                      What will students be able to do at the end of this
                      section?
                    </h4>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="p-2 w-fit border-[0.8px] border-black"
                    onClick={() => {
                      setSectionEdit(section);
                      setIsEditTitleSection(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 w-fit border-[0.8px] border-black"
                    type="submit"
                  >
                    Save section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full group gap-4 item-center">
          <div className="text-[20px] font-[700]">{position}</div>
          <div className="text-[20px] font-[700]">Unpublished Section:</div>
          <div className="leading-none flex items-center text-center text-[20px]">
            {section.name}
          </div>
          <div className="hidden gap-4 group-hover:flex">
            <button
              onClick={() => {
                setIsEditTitleSection(true);
              }}
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => {
                deleteSection(section.uuid);
              }}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TitleSection;
