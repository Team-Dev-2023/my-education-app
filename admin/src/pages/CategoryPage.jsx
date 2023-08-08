import React, { useEffect, useState } from "react";
import { deleteCategory, getCategory } from "utils/helpers/workWithApi";
import { CircularProgress } from "@mui/material";
import ListCategoryTable from "components/ListCategoryTable";
import CreateCategory from "components/categorgy/CreateCategory";
import ConfirmRemovingCategory from "components/categorgy/ConfirmRemovingCategory";

export function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [itemRemoved, setItemRemoved] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const handleGetCategories = () => {
    getCategory(setCategories, setIsLoad);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    removeItemCategory(itemRemoved.uuid);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const removeItemCategory = (uuid) => {
    // console.log(" category removed", uuid);
    deleteCategory(uuid, accessToken)
      .then(handleGetCategories)
      .catch((err) => console.log(err));
  };

  useEffect(handleGetCategories, []);

  return (
    <div className="bg-[#bbb5b633] py-2 px-4 w-full">
      <ConfirmRemovingCategory
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        itemRemoved={itemRemoved}
      />
      <h4 className="mb-[20px] font-[600] text-[20px]">List Categories</h4>
      <CreateCategory
        categories={categories}
        handleCreateCategory={handleGetCategories}
      />
      {isLoad ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ListCategoryTable
          categories={categories}
          showModal={showModal}
          setItemRemoved={setItemRemoved}
        />
      )}
    </div>
  );
}
