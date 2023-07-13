import axios from "axios";
import { API_ENDPOINT } from "constants/api";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
const api = process.env.REACT_APP_API;

function convertToSeconds(timeString) {
  var timeArray = timeString.split(" ");
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  var totalSeconds = hours * 60 * 60 + minutes * 60;

  return totalSeconds;
}

function checkMinAndMaxLength(courseLength, videoDurationFilter) {
  let result = 0;
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
  if (courseLength >= minValue && courseLength <= maxValue) {
    result++;
  }
  return result > 0;
}

const getVisibleCourses = (
  courses,
  {
    ratingsFilter,
    videoDurationFilter,
    topicFilter,
    subCategoryFilter,
    priceFilter,
    sortBy,
  }
) => {
  return courses.filter((course) => {
    axios
      .get(`${api}${API_ENDPOINT.COURSES}/${course.uuid}`)
      .then((response) => {
        // check ratings to match
        const ratingsMatch = course.rating >= ratingsFilter.data;
        //check video duration to match
        const courseLength = sectionTotalLength(response.data.sections);
        const courseLengthInSecond = convertToSeconds(courseLength);
        const videoDurationMatch = checkMinAndMaxLength(
          courseLengthInSecond,
          videoDurationFilter.data
        );
        // check topic to match
        const topicMatch = topicFilter.data.includes(course.topic.name);
        // check sub category match
        const subCategoryMatch = subCategoryFilter.data.includes(
          response?.data?.subCategory?.name
        );
        // check price to match
        const coursePriceStatus = course.price > 0 ? "paid" : "free";
        const priceMatch = priceFilter.data.includes(coursePriceStatus);
        return (
          ratingsMatch &&
          videoDurationMatch &&
          topicMatch &&
          subCategoryMatch &&
          priceMatch
        );
      })
      .catch((err) => console.log(err));
  });
  // .sort((a, b) => {
  //   if (sortBy.data) {
  //   }
  // });
};

export { getVisibleCourses };
