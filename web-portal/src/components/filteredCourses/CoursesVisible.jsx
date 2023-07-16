import { CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { getVisibleCourses } from "components/selectors/getVisibleCourses";
import CourseItem from "./CourseItem";

function CoursesVisible({ viewableCourses }) {
  //format price
  const formatPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const coursePrice = (price) =>
    price === 0 ? "Free" : formatPrice.format(price);
  // console.log(viewableCourses);

  const selectedCourses = useSelector((state) => {
    console.log("state", state);
    return getVisibleCourses(viewableCourses, state.filter);
  });
  // console.log("selec", selectedCourses);

  return (
    <div className="flex flex-col py-[19px] mt-[-16px] w-full">
      {
        selectedCourses.length > 0
          ? selectedCourses.map((item) => (
              <CourseItem key={item.uuid} item={item} />
            ))
          : viewableCourses.map((item) => (
              <CourseItem key={item.uuid} item={item} />
            ))
        // <div className="container mx-auto h-32 flex justify-center items-center">
        //   <CircularProgress />
        // </div>
      }
    </div>
  );
}

export default CoursesVisible;
