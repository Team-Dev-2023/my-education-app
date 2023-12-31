import React from "react";
import { AiFillDelete } from "react-icons/ai";

const uuid = require("uuid");

function FormIntendedLearners({
  handleSubmitForm,
  arrayContent,
  setArrayContent,
  setIsAllowSaveInfoCourse,
}) {
  function generateUUID() {
    return uuid.v4();
  }
  const handleInputChange = (arrayChange, setArrayChange, uuid, value) => {
    const updatedData = arrayChange.map((item) =>
      item.uuid === uuid ? { ...item, description: value } : item
    );
    setArrayChange(updatedData);
    setIsAllowSaveInfoCourse(true);
  };
  const handleDeleteItem = (arrayChange, setArrayChange, index) => {
    const updatedData = [...arrayChange];
    updatedData.splice(index, 1);
    setArrayChange(updatedData);
    setIsAllowSaveInfoCourse(true);
  };
  return (
    <>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        {arrayContent?.map((item, index) => (
          <div key={item.uuid} className="flex items-center gap-4">
            <input
              type="text"
              maxLength="120"
              className="border-[0.8px] border-black p-2 w-[600px]"
              id={item.uuid}
              value={item.description}
              onChange={(e) =>
                handleInputChange(
                  arrayContent,
                  setArrayContent,
                  item.uuid,
                  e.target.value
                )
              }
            />
            <button
              onClick={(e) => {
                handleDeleteItem(arrayContent, setArrayContent, index);
              }}
            >
              <AiFillDelete className="text-[20px]" />
            </button>
          </div>
        ))}
      </form>
      <button
        className="p-2 border-[0.8px] border-black mt-0 mb-6 w-fit text-[#5624d0] font-[700]"
        onClick={() => {
          setArrayContent([
            ...arrayContent,
            { uuid: generateUUID(), description: "" },
          ]);
        }}
      >
        Add more to your response
      </button>
    </>
  );
}

export default FormIntendedLearners;
