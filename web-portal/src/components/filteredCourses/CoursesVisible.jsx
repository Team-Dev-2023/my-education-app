import { CircularProgress, Rating } from "@mui/material";
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

  // console.log("view", viewableCourses);
  console.log("cos", courses);

  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    if (courses.length > 0) {
      const finalResult = async () => await getVisibleCourses(courses, filters);
      finalResult()
        .then((result) => {
          if (result.length > 0) {
            setViewCourses(result);
            setVisible(true);
          } else {
            setVisible(false);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [courses, filters]);

  console.log("view", viewCourses);

  return (
    <div className="flex flex-col py-[19px] mt-[-16px] w-full">
      {/* {!visible && (
        <div className="flex justify-center items-center">
          <p>No courses found</p>
        </div>
      )} */}
      {viewCourses.length > 0 ? (
        viewCourses.map((item) => <CourseItem key={item.uuid} item={item} />)
      ) : visible ? (
        courses.map((item) => <CourseItem key={item.uuid} item={item} />)
      ) : (
        <div className="flex justify-center items-center">
          <p>No courses found</p>
        </div>
      )}
    </div>
  );
}

export default CoursesVisible;
