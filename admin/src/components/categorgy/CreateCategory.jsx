import { useState } from "react";

import { TextField, Button } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { postCategory } from "utils/helpers/workWithApi";

function CreateCategory({ categories, handleCreateCategory }) {
  const [input, setInput] = useState("");
  const [link, setLink] = useState("");
  const [isCategoryExist, setCategoryExist] = useState(false);
  const [successCreatedCategory, setSuccessCreatedCategory] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const checkCategoryExist = (input) => {
    let result = 0;
    categories.forEach((element) => {
      if (String(element.name.toLowerCase()) === String(input.toLowerCase())) {
        result++;
      }
    });
    setCategoryExist(result > 0);
  };

  const handleTextInputChange = (event) => {
    setInput(event.target.value);
    checkCategoryExist(event.target.value);
  };
  const handleLinkInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postCategory({ name: input, imageUrl: link }, accessToken)
      .then(() => {
        handleCreateCategory();
        setInput("");
        setLink("");
        setSuccessCreatedCategory(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="min-w-[30px] mb-[20px]"
      onMouseMove={() => setSuccessCreatedCategory(false)}
    >
      {successCreatedCategory && (
        <div className="flex flex-row mt-[16px] mr-2 mb-4 max-w-[450px] bg-green-500">
          <span className="text-[20px] leading-[1.6] h-full">
            <CheckBoxIcon fontSize="inherit" className="mt-auto mr-2 my-auto" />
            Category created!
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="!flex !flex-row">
        <TextField
          onChange={handleTextInputChange}
          value={input}
          id="outlined-basic"
          label="Create a category"
          variant="outlined"
          className="!box-border flex-grow !mr-2"
        />
        <TextField
          onChange={handleLinkInputChange}
          value={link}
          id="outlined-basic"
          label="Add image link"
          variant="outlined"
          className="!box-border flex-grow !mr-2"
          required={input.length > 0}
        />
        <Button
          variant="outlined"
          type="submit"
          disabled={input.length === 0 || isCategoryExist}
          className="!font-bold !border-[2px]"
        >
          Create category
        </Button>
      </form>
      {isCategoryExist && (
        <div className="flex flex-row items-end mt-[16px] mr-2 text-[20px] leading-[1.2]">
          <HighlightOffIcon fontSize="inherit" className="mt-auto mr-2" />
          Category name already exist. Please create a different category
        </div>
      )}
    </div>
  );
}

export default CreateCategory;
