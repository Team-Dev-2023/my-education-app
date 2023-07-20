import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";

function convertToSeconds(timeString) {
  var timeArray = timeString.split(" ");
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  var totalSeconds = hours * 60 * 60 + minutes * 60;

  return totalSeconds;
}

const checkMinAndMaxLength = (courseLength, videoDurationFilterData) => {
  const minValue = [];
  const maxValue = [];
  for (let index = 0; index < videoDurationFilterData.length; index++) {
    const { min, max } = videoDurationFilterData[index];
    minValue.push(min);
    maxValue.push(max);
  }
  return (
    courseLength >=
      minValue.reduce((min, cur) => {
        return cur <= min ? cur : min;
      }, minValue[0]) &&
    courseLength <=
      maxValue.reduce((max, cur) => {
        return cur >= max ? cur : max;
      }, maxValue[0])
  );
};

const getVisibleCourses = (
  courses,
  {
    ratingsFilter,
    videoDurationFilter,
    topicFilter,
    subCategoryFilter,
    priceFilter,
    sortByFilter,
  }
) =>
  courses
    .filter((course) => {
      // check ratings to match
      const ratingsMatch = course.price >= ratingsFilter.data;
      //check video duration to match
      const courseLength = sectionTotalLength(course.sections);
      const courseLengthInSecond = convertToSeconds(courseLength);
      const videoDurationMatch =
        videoDurationFilter.data.length === 0
          ? true
          : checkMinAndMaxLength(
              courseLengthInSecond,
              videoDurationFilter.data
            );
      // check topic to match
      const topicResult = topicFilter.data.map((item) => item.uuid);
      const topicMatch =
        topicResult.length === 0
          ? true
          : topicResult.includes(course.topic.uuid);
      // check sub category match
      const subCategoryResult = subCategoryFilter.data.map((item) => item.uuid);
      const subCategoryMatch =
        subCategoryResult.length === 0
          ? true
          : subCategoryResult.includes(course.subCategory.uuid);
      // check price to match
      const priceResult = priceFilter.data.map((item) => item.price);
      let priceMatch =
        priceResult.length === 0 || priceResult.length === 2
          ? true
          : priceResult.includes("Free")
          ? course.price === 0
          : priceResult.includes("Paid")
          ? course.price > 0
          : false;
      return (
        ratingsMatch &&
        videoDurationMatch &&
        topicMatch &&
        subCategoryMatch &&
        priceMatch
      );
    })
    .sort((a, b) => {
      const dateStringA = a.createdAt;
      const dateStringB = b.createdAt;
      const dateObjectA = new Date(dateStringA);
      const dateObjectB = new Date(dateStringB);
      const unixTimestampA = dateObjectA.getTime() / 1000; // Convert milliseconds to seconds
      const unixTimestampB = dateObjectB.getTime() / 1000; // Convert milliseconds to seconds

      if (sortByFilter.data === "Newest") {
        return unixTimestampA > unixTimestampB ? 1 : -1;
      }
      // else if (sortByFilter.data === "Highest Rate") {
      //   return a.ratings > b.ratings ? 1 : -1;
      // }
      return 0;
    });

export { getVisibleCourses };
