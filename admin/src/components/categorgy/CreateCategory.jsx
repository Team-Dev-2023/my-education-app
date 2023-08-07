import { useState } from "react";

import { TextField, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function CreateCategory({ categories }) {
  const [input, setInput] = useState("");
  const [isCategoryExist, setCategoryExist] = useState(false);

  const checkCategoryExist = (input) => {
    let result = 0;
    categories.forEach((element) => {
      if (String(element.name.toLowerCase()) === String(input.toLowerCase())) {
        result++;
      }
    });
    setCategoryExist(result > 0);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    checkCategoryExist(event.target.value);
    console.log(isCategoryExist);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
  };

  return (
    <div className="min-w-[30px] mb-[20px]">
      <form onSubmit={handleSubmit} className="!flex !flex-row">
        <TextField
          onChange={handleInputChange}
          value={input}
          id="outlined-basic"
          label="Create a category"
          variant="outlined"
          className="!box-border flex-grow !mr-2"
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
          Category already exist. Please create another category
        </div>
      )}
    </div>
  );
}

export default CreateCategory;
