import { lecturesCalculator } from "utils/helpers/calculateLecturesOfCourse.helper";
import SectionsList from "./SectionsList";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";

function CourseContent(props) {
  const { data } = props;
  return (
    <div className="py-[24px] color-[#1c1d1f] max-w-[700px] ">
      <h2 className="mx-[24px] mb-[16px] font-[700] text-[24px]">
        Course content
      </h2>
      <div className="container mx-[24px] leading-[1.4] h-[40px] inline-flex items-center">
        <span>
          {data.sections.length}
          {" sections. - "}
          {lecturesCalculator(data.sections)}
          {" lectures. - "}
          {/* {sectionTotalLength(data.sections)} */}
          {" total length."}
        </span>
      </div>
      <div className="container mx-[24px]">
        <SectionsList sections={data.sections} />
      </div>
    </div>
  );
}

export default CourseContent;
