import React, { useState } from "react";
const uuid = require("uuid");

function AddNewSection({ listSectionPut, setListSectionPut }) {
  const [isAddNewSection, setIsAddNewSection] = useState(false);

  function generateUUID() {
    return uuid.v4();
  }
  const addNewSection = (e, value) => {
    e.preventDefault();
    setListSectionPut([
      ...listSectionPut,
      {
        uuid: generateUUID(),
        name: e.target.name.value,
        position: "",
        lectures: [],
      },
    ]);
    setIsAddNewSection(false);
  };

  return (
    <>
      {isAddNewSection ? (
        <div className="my-4 p-3 border-[0.8px] border-black flex  gap-4">
          <h4 className="mt-2">New Section</h4>
          <div className="flex-1">
            <form
              form={"addNewSectionForm"}
              onSubmit={(e, value) => addNewSection(e, value)}
              action=""
              className="flex w-full flex-col gap-4"
            >
              <input
                type="text"
                id="name"
                required
                placeholder="Enter a Title"
                className="p-2 w-full border-[0.8px] border-black"
              />
              <h4>
                What will students be able to do at the end of this section?
              </h4>

              <div className="flex justify-end gap-4">
                <button
                  className="p-2 w-fit border-[0.8px] border-black"
                  onClick={() => setIsAddNewSection(false)}
                >
                  Cancel
                </button>
                <button
                  className="p-2 w-fit border-[0.8px] bg-[#262528ec] text-white"
                  type="submit"
                >
                  Add section
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          className="w-fit p-2 border-[0.8px] border-black cursor-pointer mt-4"
          onClick={() => {
            setIsAddNewSection(true);
          }}
        >
          Add section
        </button>
      )}
    </>
  );
}

export default AddNewSection;
