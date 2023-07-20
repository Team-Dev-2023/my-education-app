import { CircularProgress, Pagination, Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { getVisibleCourses } from "components/selectors/getVisibleCourses";
import CourseItem from "./CourseItem";
import { useEffect, useState } from "react";
import { getCourse } from "utils/helpers/workWithApi";
import { flushSync } from "react-dom";

function CoursesVisible({ viewableCourses }) {
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(true);
  const [viewCourses, setViewCourses] = useState([]);
  //pagination
  const [page, setPage] = useState(1);
  const [paginationVisibleCourses, setPaginationVisibleCourses] = useState([]);

  const handleGetFullCoursesData = async () => {
    const fullCoursesData = [];
    const setFullCoursesData = (course) => {
      fullCoursesData.push(course);
    };
    for (let index = 0; index < viewableCourses.length; index++) {
      await getCourse(viewableCourses[index].uuid, setFullCoursesData);
    }
    return fullCoursesData;
  };

  useEffect(() => {
    handleGetFullCoursesData().then((res) => {
      setCourses(res);
    });
  }, []);

  // console.log("cos", courses);

  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    if (courses.length > 0) {
      const finalResult = async () => await getVisibleCourses(courses, filters);
      finalResult()
        .then((result) => {
          flushSync(() => {
            setViewCourses(result);
            setPaginationVisibleCourses(result.slice(0, 9));
            setVisible(false);
          });
        })
        .catch((e) => console.log(e));
    }
  }, [courses, filters]);

  // console.log("view", paginationVisibleCourses);

  const handleChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      setPaginationVisibleCourses(viewCourses.slice(0, 9));
    }
    if (value > 1) {
      setPaginationVisibleCourses(
        viewCourses.slice((value - 1) * 10, value * 10 - 1)
      );
    }
  };

  return (
    <div className="flex flex-col py-[19px] w-full">
      {courses.length === 0 ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : viewCourses.length > 0 ? (
        paginationVisibleCourses.map((item) => (
          <CourseItem key={item.uuid} item={item} />
        ))
      ) : visible ? (
        courses.map((item) => <CourseItem key={item.uuid} item={item} />)
      ) : (
        <div className="flex justify-center items-center">
          <p>No courses found</p>
        </div>
      )}
      {courses.length > 0 && (
        <div className="container w-full mx-auto flex justify-center mt-[16px]">
          <Pagination
            count={Math.ceil(viewCourses.length / 10)}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default CoursesVisible;
