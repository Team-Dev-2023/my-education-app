import axios from "axios";
import { API_ENDPOINT } from "constants/api";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import { async } from "./../../utils/helpers/workWithApi";
const api = process.env.REACT_APP_API;

function convertToSeconds(timeString) {
  var timeArray = timeString.split(" ");
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  var totalSeconds = hours * 60 * 60 + minutes * 60;

  return totalSeconds;
}

function checkMinAndMaxLength(courseLength, videoDurationFilter) {
  let minValue = 0;
  let maxValue = Number.MAX_SAFE_INTEGER;
  for (let index = 0; index < videoDurationFilter.length; index++) {
    const { min, max } = videoDurationFilter[index];
    if (min >= minValue) {
      minValue = min;
    }
    if (max <= maxValue) {
      maxValue = max;
    }
  }
  return courseLength >= minValue && courseLength <= maxValue;
}

const getVisibleCourses = async (
  courses,
  {
    // ratingsFilter,
    videoDurationFilter,
    topicFilter,
    subCategoryFilter,
    priceFilter,
    // sortByFilter,
  }
) => {
  const fullCoursesData = await Promise.all(
    courses.map(async (course) => {
      const courseData = await axios.get(
        `${api}${API_ENDPOINT.COURSES}/${course.uuid}`
      );
      return courseData.data;
    })
  );
  // console.log("ful", fullCoursesData);
  return fullCoursesData.filter((course) => {
    // check ratings to match
    // const ratingsMatch = course?.rating >= ratingsFilter.data;
    //check video duration to match
    const courseLength = sectionTotalLength(course.sections);
    const courseLengthInSecond = convertToSeconds(courseLength);
    const videoDurationMatch = checkMinAndMaxLength(
      courseLengthInSecond,
      videoDurationFilter.data
    );
    // check topic to match
    const topicMatch = topicFilter.data.includes(course.topic.name);
    // check sub category match
    const subCategoryMatch = subCategoryFilter.data.includes(
      course?.subCategory?.name
    );
    // check price to match
    const coursePriceStatus = course?.price > 0 ? "paid" : "free";
    const priceMatch = priceFilter.data.includes(coursePriceStatus);
    return (
      // ratingsMatch &&
      // videoDurationMatch &&
      topicMatch && subCategoryMatch && priceMatch
    );
  });
};

export { getVisibleCourses };
