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

const getVisibleCourses = (
  courses,
  {
    // ratingsFilter,
    videoDurationFilter,
    topicFilter,
    subCategoryFilter,
    priceFilter,
    // sortByFilter,
  }
) =>
  courses.filter((course) => {
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
    const topicResult = topicFilter.data.map((item) => item.uuid);
    const topicMatch =
      topicResult.length === 0 ? true : topicResult.includes(course.topic.uuid);
    // check sub category match
    const subCategoryResult = subCategoryFilter.data.map((item) => item.uuid);
    const subCategoryMatch =
      subCategoryResult.length === 0
        ? true
        : subCategoryResult.includes(course.subCategory.uuid);
    // check price to match
    const priceResult = priceFilter.data.map((item) => item.price);
    const priceMatch =
      priceResult.length === 0 || priceResult.length === 2
        ? true
        : priceResult.includes("Free")
        ? course.price === 0
        : priceResult.includes("Paid")
        ? course.price > 0
        : false;
    return (
      // ratingsMatch &&
      // videoDurationMatch &&
      topicMatch && subCategoryMatch && priceMatch
    );
  });

export { getVisibleCourses };
