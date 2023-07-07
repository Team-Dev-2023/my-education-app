import { useParams } from "react-router-dom";
import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeaderChangeContentCourse from "components/SharedChangeInfoCourse/HeaderChangeContentCourse";
import { useEffect, useState } from "react";
import { getCourse, putCourse } from "utils/helpers/workWithAPI";

function ChangePricingAndPromotionsPage() {
  const { courseUuid } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  const [dataCourse, setDataCourse] = useState();
  const [infoCourse, setInfoCourse] = useState({});
  const [price, setPrice] = useState();
  const [priceAfterDiscount, setPriceAfterDiscount] = useState();
  const [isAlertSaveInfoCourseSuccess, setIsAlertSaveInfoCourseSuccess] =
    useState(false);
  const [isAllowSaveInfoCourse, setIsAllowSaveInfoCourse] = useState(false);

  useEffect(() => {
    getCourse(courseUuid, setDataCourse);
  }, []);

  useEffect(() => {
    setPrice(infoCourse.price);
    setPriceAfterDiscount(infoCourse.priceAfterDiscount);
  }, [infoCourse]);

  useEffect(() => {
    if (dataCourse) {
      const {
        createdAt,
        createdBy,
        lastUpdatedAt,
        lastUpdatedBy,
        uuid,
        category,
        subCategory,
        topic,
        ...dataSplitted
      } = dataCourse.data;
      setInfoCourse(dataSplitted);
    }
  }, [dataCourse]);

  // PUT COURSE
  const handleSubmitForm = () => {
    let dataCoursePut = {
      ...infoCourse,
      price: parseInt(price, 10),
      priceAfterDiscount: priceAfterDiscount,
      topicUuid: dataCourse.data.topic.uuid,
    };
    let callback = () => {
      setIsAlertSaveInfoCourseSuccess(true);
      setIsAllowSaveInfoCourse(false);
    };
    putCourse(accessToken, courseUuid, dataCoursePut, callback);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <HeaderChangeContentCourse
        courseUuid={courseUuid}
        handleSubmitForm={handleSubmitForm}
        isAlertSaveInfoCourseSuccess={isAlertSaveInfoCourseSuccess}
        setIsAlertSaveInfoCourseSuccess={setIsAlertSaveInfoCourseSuccess}
        isAllowSaveInfoCourse={isAllowSaveInfoCourse}
      />
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px] mt-[44px] ">
        <SliderBarCreateCourse number={4} />
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] px-8 py-[24px] font-[700] text-[24px] ">
            Pricing
          </div>
          <div className="p-8">
            <div className="mb-8 flex flex-col gap-2">
              <h4 className="font-[700] ">Course Price Tier</h4>
              <p className="leading-6">
                Please select the price tier for your course below and click
                'Save'. The list price that students will see in other
                currencies is determined using the price tier matrix.
              </p>
              <p className="leading-6 ">
                If you intend to offer your course for free, the total length of
                video content must be less than 2 hours.
              </p>
            </div>
            <form onSubmit={handleSubmitForm} className="flex flex-col  gap-4">
              <div className="flex items-center gap-2">
                <h4 className="font-[700]">Price:</h4>
                <input
                  type="number"
                  maxLength="120"
                  id="price"
                  className="border-[0.8px] border-black p-2 
                w-[200px]"
                  defaultValue={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setIsAllowSaveInfoCourse(true);
                  }}
                />
                <p>USD</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="font-[700]">Price after discount:</h4>
                <input
                  type="number"
                  maxLength="120"
                  id="priceÀterDiscount"
                  className="border-[0.8px] border-black p-2 
                w-[200px]"
                  defaultValue={priceAfterDiscount}
                  onChange={(e) => {
                    setIsAllowSaveInfoCourse(true);
                    setPriceAfterDiscount(e.target.value);
                  }}
                />
                <p>USD</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePricingAndPromotionsPage;
