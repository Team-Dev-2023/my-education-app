import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import {
  getCourseAction,
  putCourseAction,
  getCategoriesAction,
  getSubCategoriesAction,
  getTopicsAction,
} from "redux/actions";
import RichTextEditor from "components/RichTextEditor";
import { AiFillSetting } from "react-icons/ai";

const api = process.env.REACT_APP_API;

function ChangeInfoCoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseUuid } = useParams();
  const [formInfoCourse] = Form.useForm();

  const accessToken = localStorage.getItem("accessToken");

  const { dataCourse } = useSelector((store) => store.course);
  const { userInfo } = useSelector((store) => store.auth);
  const { categories } = useSelector((store) => store.cate_subCate_topic);
  const { subCategories } = useSelector((store) => store.cate_subCate_topic);
  const { topics } = useSelector((store) => store.cate_subCate_topic);

  const [fileList, setFileList] = useState([]);
  const [infoCourse, setInfoCourse] = useState({});
  const [infoCourseClone, setInfoCourseClone] = useState({});
  const [isSubmitInfoCurse, setIsSubmitInfoCurse] = useState(false);
  const [categoriesForOptions, setCategoriesForOptions] = useState([]);
  const [subCategoriesForOptions, setSubCategoriesForOptions] = useState([]);
  const [topicsForOptions, setTopicsForOptions] = useState([]);
  const [descriptionCourse, setDescriptionCourse] = useState("");

  //GET DATA_COURSE
  useEffect(() => {
    dispatch(getCourseAction({ courseUuid: courseUuid }));
  }, []);

  //COVERT DATA_COURSE TO infoCourse,  WHICH CAN PUT TO API
  useEffect(() => {
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

    // add cate, subCate, topic into setInfoCourseClone be used show UI and UX select option,
    //select will change setInfoCourseClone
    setInfoCourseClone({
      ...dataCourse.data,
      category: dataCourse?.data?.category?.uuid,
      subCategory: dataCourse?.data?.subCategory?.uuid,
      topic: dataCourse?.data?.topic?.uuid,
    });
    if (
      dataCourse.data.imageUrl === "string" ||
      dataCourse.data.imageUrl === ""
    )
      setFileList([]);
    else
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${api}/${dataCourse?.data?.imageUrl}`,
        },
      ]);
  }, [dataCourse]);
  //get categories when render cpn
  useEffect(() => {
    dispatch(
      getCategoriesAction({
        page: 1,
        perPage: 10,
      })
    );
  }, []);

  //get subCate, topic when infoCourseClone changed
  useEffect(() => {
    getSubCategories(infoCourseClone?.category);
    getTopics(infoCourseClone?.subCategory);
  }, [infoCourseClone]);

  //function get  subCate, topic
  const getSubCategories = (value) => {
    setSubCategoriesForOptions([]);
    dispatch(
      getSubCategoriesAction({
        page: 1,
        perPage: 10,
        categoryUuid: value,
      })
    );
  };
  const getTopics = (value) => {
    setTopicsForOptions([]);
    dispatch(
      getTopicsAction({
        page: 1,
        perPage: 10,
        subCategoryUuid: value,
      })
    );
  };
  //COVERT DATA FROM API TO DATA USED FOR OPTION ANT
  useEffect(() => {
    setCategoriesForOptions([]);
    categories?.data?.map((item) => {
      setCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [categories]);
  useEffect(() => {
    setSubCategoriesForOptions([]);
    subCategories?.data?.map((item) => {
      setSubCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [subCategories]);
  useEffect(() => {
    setTopicsForOptions([]);
    topics?.data?.map((item) => {
      setTopicsForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [topics]);

  //PUT COURSE
  useEffect(() => {
    isSubmitInfoCurse && handleSubmitInfoCourse();
  }, [infoCourse]);

  const handleSubmitInfoCourse = () => {
    dispatch(
      putCourseAction({
        accessToken: accessToken,
        courseUuid: courseUuid,
        data: infoCourse,
        callback: (courseUuid) => {
          navigate(
            generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
              courseUuid: courseUuid,
            })
          );
        },
      })
    );
  };

  //upload file img
  const [imageUrl, setImageUrl] = useState("");
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    setImageUrl((prevImageUrl) => newFileList.slice(-1)[0]?.response?.url);
    setInfoCourse((prevInfoCourse) => ({
      ...prevInfoCourse,
      imageUrl: newFileList.slice(-1)[0]?.response?.url,
    }));
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <div
        className="header w-full h-[56px] px-4 bg-[#1c1d1f]
         text-white flex justify-between items-center 
      fixed top-0 right-0 z-40"
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              navigate(ROUTES.LECTURE.HOME_PAGE);
            }}
          >
            Back to Home
          </button>
        </div>
        <div className="text-[24px] font-[700]">Update your course</div>
        <div className="flex gap-4">
          <button
            className="px-4 py-1 bg-slate-400"
            onClick={() => formInfoCourse.submit()}
          >
            Save
          </button>
          <button className="px-4 py-2 ">
            <AiFillSetting className="text-[28px]" />
          </button>
        </div>
      </div>
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px]  mt-[44px] ">
        <div className="slide-bar w-[240px] fixed left-[24px]">
          <h4 className="font-[700] mb-2">Publish your course</h4>
          <div className="flex flex-col gap-3">
            <div className="bg-[#c0c5c1] p-2 cursor-pointer">
              1. Course landing page
            </div>
            <div
              className=" p-2 cursor-pointer"
              onClick={() => {
                navigate(
                  generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
                    courseUuid: courseUuid,
                  })
                );
              }}
            >
              2. Intended learners
            </div>
            <div
              className="p-2 cursor-pointer"
              onClick={() => {
                navigate(
                  generatePath(ROUTES.LECTURE.CHANGE_CURRICULUM_COURSE, {
                    courseUuid: courseUuid,
                  })
                );
              }}
            >
              3. Curriculum
            </div>
            <div className=" p-2">4. Pricing and Promotions</div>
          </div>
        </div>
        <div className="content w-[1027px] shadow-md ml-[240px] ">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px]">
            Course landing page
          </div>
          <div className="p-8">
            <p className="my-2 leading-6">
              Your course landing page is crucial to your success on Udemy. If
              it’s done right, it can also help you gain visibility in search
              engines like Google. As you complete this section, think about
              creating a compelling Course Landing Page that demonstrates why
              someone would want to enroll in your course. Learn more about
              creating your course landing page and course title standards.
            </p>
            <Form
              form={formInfoCourse}
              name="formInfoCourse"
              onFinish={(values) => {
                setInfoCourse({
                  ...infoCourse,
                  ...values,
                  description: descriptionCourse,
                  topicUuid: infoCourseClone.topic,
                });
                setIsSubmitInfoCurse(true);
              }}
              layout={"vertical"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4",
              }}
              fields={[
                {
                  name: "title",
                  value: infoCourseClone?.title,
                },
                {
                  name: "subTitle",
                  value: infoCourseClone?.subTitle,
                },

                {
                  name: "category",
                  value: infoCourseClone?.category,
                },
                {
                  name: "subCategory",
                  value: infoCourseClone?.subCategory,
                },
                {
                  name: "topic",
                  value: infoCourseClone?.topic,
                },
                {
                  name: "imageUrl",
                  value: infoCourse.imageUrl,
                },
              ]}
            >
              <Form.Item
                label="Course title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input  course title",
                  },
                ]}
              >
                <Input
                  placeholder="Insert your course title"
                  showCount
                  onChange={(e) => {
                    setInfoCourseClone({
                      ...infoCourseClone,
                      title: e.target.value,
                    });
                  }}
                  maxLength={60}
                />
              </Form.Item>
              <p className="text-[14px] ml-2 mt-2 mb-4">
                Your title should be a mix of attention-grabbing, informative,
                and optimized for search
              </p>
              <Form.Item
                label="Course subtitle"
                name={"subTitle"}
                rules={[
                  {
                    required: true,
                    message: "Please input your course subtitle",
                  },
                ]}
              >
                <Input
                  placeholder="Insert your course subtitle"
                  showCount
                  onChange={(e) => {
                    setInfoCourseClone({
                      ...infoCourseClone,
                      subTitle: e.target.value,
                    });
                  }}
                  maxLength={120}
                />
              </Form.Item>
              <p className="text-[14px] ml-2 mt-2 mb-4">
                Use 1 or 2 related keywords, and mention 3-4 of the most
                important areas that you've covered during your course.
              </p>
              <span className="text-[20px] flex gap-2">
                <p className="text-red-500 text-[20px] text-center flex items-center leading-[2]">
                  *
                </p>
                Course description
              </span>
              <RichTextEditor
                description={infoCourse.description}
                setDescription={setDescriptionCourse}
              ></RichTextEditor>
              <p className="text-[14px] ml-2 mt-2 mb-4">
                Description should have minimum 200 words.
              </p>
              <div className="flex gap-8 w-full mb-4">
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select your category of course!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Select category"
                    options={categoriesForOptions}
                    onChange={(value) => {
                      setInfoCourseClone({
                        ...infoCourseClone,
                        category: value,
                        topic: undefined,
                        subCategory: undefined,
                      });

                      formInfoCourse.setFieldsValue({
                        subCategoryUuid: undefined,
                        topicUuid: undefined,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="subCategory"
                  name="subCategory"
                  rules={[
                    {
                      required: true,
                      message: "Please select your subCategory of course!",
                    },
                  ]}
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                  }}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Select subCategory"
                    options={subCategoriesForOptions}
                    onChange={(value) => {
                      setInfoCourseClone({
                        ...infoCourseClone,
                        subCategory: value,
                        topic: undefined,
                      });

                      formInfoCourse.setFieldsValue({
                        topicUuid: undefined,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Topic"
                  name="topic"
                  rules={[
                    {
                      required: true,
                      message: "Please select your topic of course!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Select topic"
                    options={topicsForOptions}
                    disabled={!formInfoCourse.getFieldValue("subCategory")}
                    onChange={(value) => {
                      setInfoCourseClone({
                        ...infoCourseClone,
                        topic: value,
                      });
                    }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={"Course image"}
                name={"imageUrl"}
                rules={[
                  {
                    required: true,
                    message: "Please select your course image!",
                  },
                ]}
              >
                <ImgCrop rotationSlider>
                  <Upload
                    action={`${api}/file-uploader/image`}
                    listType="picture-card"
                    fileList={fileList}
                    onClick={() => {
                      setInfoCourse((prevInfoCourse) => ({
                        ...prevInfoCourse,
                        ...formInfoCourse.getFieldsValue(),
                      }));
                    }}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                    {fileList.length === 1 && "Change image"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item label="Instructor profile(s)">
                <div
                  className="flex items-center gap-2 py-6 !pl-2
                  border-b-[0.8px]  hover:text-[#5624d0] cursor-pointer"
                  onClick={() => {
                    navigate(ROUTES.LECTURE.HOME_PAGE);
                  }}
                >
                  {userInfo?.data?.avatar ? (
                    <img
                      className="w-[32px] "
                      src="userInfo.data.avatar"
                      alt="avatar"
                    />
                  ) : (
                    <div className="w-[64px] h-[64px] !text-white text-[30px] flex items-center justify-center leading-[24px] font-bold  rounded-full bg-black hover:cursor-pointer ">
                      {userInfo?.data?.firstName?.charAt(0)}
                    </div>
                  )}
                  <div className=" ">
                    <div className="text-[20px] font-[700] mb-1">
                      {userInfo?.data?.firstName}
                    </div>
                    <div className="text-[16px] font-[600] mb-2">
                      {userInfo?.data?.email}
                    </div>
                  </div>
                </div>
              </Form.Item>
              <Form.Item className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="rounded-none mt-2 bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
                >
                  Next step
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInfoCoursePage;
