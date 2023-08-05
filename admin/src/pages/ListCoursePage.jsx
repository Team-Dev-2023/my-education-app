import React, { useEffect, useState } from "react";
import ListCourseAdmin from "components/ListCourseAdmin";
import { getListCourse } from "utils/helpers/workWithApi";
import { CircularProgress } from "@mui/material";
import ConfirmChangeApprovalCourse from "components/ConfirmChangeApprovalCourse";

function ListCoursePage() {
  const [dataCourses, setDataCourses] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    getListCourse(setDataCourses, setIsLoad);
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
  return (
    <div className="bg-[#bbb5b633] py-2 px-4 w-full">
      <ConfirmChangeApprovalCourse
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        itemApproval={itemApproval}
      />
      <h4 className="mb-4 font-[600] text-[20px]">List Course</h4>
      {isLoad ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ListCourseAdmin
          dataCourses={dataCourses}
          showModal={showModal}
          setItemApproval={setItemApproval}
        />
      )}
    </div>
  );
}

export default ListCoursePage;
