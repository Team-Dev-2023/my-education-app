import React, { useEffect, useState } from "react";
import ListCourseAdmin from "components/ListCourseAdmin";
import { getListCourse } from "utils/helpers/workWithApi";
import { CircularProgress } from "@mui/material";

function ListCoursePage() {
  const [dataCourses, setDataCourses] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    getListCourse(setDataCourses, setIsLoad);
  }, []);
  return (
    <div className="bg-[#bbb5b633] py-2 px-4 w-full">
      <h4 className="mb-4 font-[600] text-[20px]">List Course</h4>
      {isLoad ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ListCourseAdmin dataCourses={dataCourses} />
      )}
    </div>
  );
}

export default ListCoursePage;
