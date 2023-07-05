import SectionsList from "./SectionsList";
import { lecturesCalculator } from "utils/helpers/calculateLecturesOfCourse.helper";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";

function CourseContent(props) {
  const { courseData } = props;
  return (
    <div className="mb-[32px] color-[#1c1d1f] max-w-[700px]">
      <h2 className="mb-[16px] font-[700] text-[24px]">Course content</h2>
      <div className="container leading-[1.4] h-[40px] inline-flex items-center">
        <span>
          {courseData.sections.length}
          {" sections - "}
          {lecturesCalculator(courseData.sections)}
          {" lectures - "}
          {sectionTotalLength(courseData.sections)}
          {" total length."}
        </span>
      </div>
      <div className="container">
        <SectionsList
          sections={courseData.sections}
          title={courseData.title}
          image={courseData.imageUrl}
        />
      </div>
    </div>
  );
}

export default CourseContent;
