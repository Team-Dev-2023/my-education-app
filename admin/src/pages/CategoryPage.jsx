import React, { useEffect, useState } from "react";
import { getCategory } from "utils/helpers/workWithApi";
import { CircularProgress } from "@mui/material";
import ConfirmChangeApprovalCourse from "components/ConfirmChangeApprovalCourse";
import ListCategoryTable from "components/ListCategoryTable";

export function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    getCategory(setCategories, setIsLoad);
  }, []);
  const [itemApproval, setItemApproval] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    removeItemCart(itemApproval.uuid);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const removeItemCart = (courseUuid) => {
    console.log(" courseUuid approval", courseUuid);
  };

  console.log("categories", categories);
  return (
    <div className="bg-[#bbb5b633] py-2 px-4 w-full">
      <ConfirmChangeApprovalCourse
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        itemApproval={itemApproval}
      />
      <h4 className="mb-4 font-[600] text-[20px]">List Categories</h4>
      {isLoad ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ListCategoryTable
          categories={categories}
          showModal={showModal}
          setItemApproval={setItemApproval}
        />
      )}
    </div>
  );
}
