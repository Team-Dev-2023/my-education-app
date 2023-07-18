import Filtering from "./Filtering";
import CoursesVisible from "./CoursesVisible";

function AllCourses({ courses, sourceName, topics, subCategories }) {
  return (
    <div className="mb-[48px]">
      <h2 className="font-[700] text-[24px] leading-[1.2] mb-[16px]">
        All <span className="capitalize text-[24px]">{sourceName}</span> courses
      </h2>
      <div className="flex flex-row">
        <Filtering
          inputCourses={courses}
          topics={topics}
          subCategories={subCategories}
        />
        <CoursesVisible viewableCourses={courses} />
      </div>
    </div>
  );
}

export default AllCourses;
